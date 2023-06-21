import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { WorkoutContext } from "../workouts/WorkoutContext";
import { RoutineContext } from "../routines/RoutineContext";
import { UserContext } from "../users/UserContext";
import LandingCards from "./LandingCards";
import WorkoutCard from "../workouts/WorkoutCard";

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

  if (!routines || routines.length === 0) {
    return <div>Loading...</div>;
  }

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
            <h2>Favorite Workout Routines</h2>
            <div className="routine-card-list">
              {routinesToDisplay.map((routine) => {
                return <LandingCards routine={routine} key={routine.id} />;
              })}
            </div>
          </div>
        ) : (
          <div>
            <h2>Popular Routines</h2>
            {routinesToDisplay.length > 0 ? (
              <div className="routine-card-list">
                {routinesToDisplay.map((routine) => (
                  <LandingCards routine={routine} key={routine.id} />
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
              <WorkoutCard workout={workout} key={workout.id} />
            ))}
          </div>
        ) : (
          <div>
            <p>You haven't done any workouts.</p>
            <Link to="/routines">Find a workout routine!</Link>
          </div>
        )}
      </section>
    </main>
  );
}

export default Landing;
