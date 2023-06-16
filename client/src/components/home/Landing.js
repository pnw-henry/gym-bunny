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
    <div className="landing">
      <h2>Welcome to the Landing Page</h2>

      <div>
        <h3>Your Favorite Routines</h3>
        {favoriteRoutinesExist ? (
          <div className="routine-list">
            {favorites.map((favorite) => {
              const routine = findRoutineById(favorite.routine_id);
              return routine ? (
                <div key={routine.id}>{routine.name}</div>
              ) : null;
            })}
          </div>
        ) : (
          <p>No favorite routines found.</p>
        )}
      </div>

      <div>
        <h3>Latest Workouts</h3>
        {latestWorkouts.length > 0 ? (
          <div className="workout-list">
            {latestWorkouts.map((workout) => (
              <div key={workout.id}>{workout.date}</div>
            ))}
          </div>
        ) : (
          <p>No workouts found.</p>
        )}
      </div>

      {!favoriteRoutinesExist && (
        <div>
          <h3>Random Routines</h3>
          <div className="routine-list">
            {routinesToDisplay.map((routine) => (
              <div key={routine.id}>{routine.name}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Landing;
