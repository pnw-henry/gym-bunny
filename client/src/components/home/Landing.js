import React from "react";
import { Link } from "react-router-dom";
import { WorkoutContext } from "../workouts/WorkoutContext";
import { RoutineContext } from "../routines/RoutineContext";
import { UserContext } from "../users/UserContext";
import { useContext, useState, useEffect } from "react";

function Landing() {
  const { user } = useContext(UserContext);
  const { userWorkouts } = useContext(WorkoutContext);
  const { routines, favorites } = useContext(RoutineContext);
  const [latestWorkouts, setLatestWorkouts] = useState([]);

  useEffect(() => {
    const sortedWorkouts = userWorkouts.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    const latest = sortedWorkouts.slice(0, 3);
    setLatestWorkouts(latest);
  }, [userWorkouts]);

  const getRandomRoutines = () => {
    const randomRoutines = [];
    const availableRoutines = routines.filter(
      (routine) => !favorites.includes(routine.id)
    );

    while (randomRoutines.length < 3 && availableRoutines.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableRoutines.length);
      const randomRoutine = availableRoutines.splice(randomIndex, 1)[0];
      randomRoutines.push(randomRoutine);
    }

    return randomRoutines;
  };

  const findRoutineById = (routineId) => {
    return routines.find((routine) => routine.id === routineId);
  };

  const favoriteRoutinesExist = favorites.length > 0;
  const routinesToDisplay = favoriteRoutinesExist
    ? favorites.map((favorite) => findRoutineById(favorite.routine_id))
    : getRandomRoutines();

  return (
    <main className="landing">
      <section className="workout-routines">
        {favoriteRoutinesExist ? (
          <div>
            <h2>Your Favorite Routines</h2>
            <div className="routine-card-list">
              {routinesToDisplay.map((routine) => {
                return (
                  <div className="routine-card" key={routine.id}>
                    <h4>{routine.name}</h4>
                    <Link to={`/routines/${routine.id}`}>
                      <img src={routine.routine_photo} alt={routine.name} />
                    </Link>
                    <p>{routine.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div>
            <h2>Popular Routines</h2>
            {routinesToDisplay.length > 0 ? (
              <div className="routine-card-list">
                {routinesToDisplay.map((routine) => (
                  <>
                    <div className="routine-card" key={routine.id}>
                      <h4>{routine.name}</h4>
                      <Link to={`/routines/${routine.id}`}>
                        <img src={routine.routine_photo} alt={routine.name} />
                      </Link>
                      <p>{routine.description}</p>
                    </div>
                  </>
                ))}
              </div>
            ) : (
              <p>No routines found.</p>
            )}
          </div>
        )}
      </section>

      <section>
        <h2>Latest Workouts</h2>
        {latestWorkouts.length > 0 && user !== null ? (
          <div className="latest-workouts workout-card-list">
            {latestWorkouts.map((workout) => (
              <div className="workout-card" key={workout.id}>
                <h4>Routine Name</h4>
                <p className="workout-date">
                  {new Date(workout.date).toLocaleDateString(
                    navigator.language,
                    { dateStyle: "full" }
                  )}
                </p>
                <p className="workout-details">
                  {workout.duration} minutes • {workout.calories_burned} cals
                </p>
                <p className="workout-notes">{workout.notes}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No workouts found.</p>
        )}
      </section>
    </main>
  );
}

export default Landing;
