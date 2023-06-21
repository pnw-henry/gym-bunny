import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { RoutineContext } from "../routines/RoutineContext";

function WorkoutCard({ workout }) {
  const { routines } = useContext(RoutineContext);
  const routine = routines.map((routine) => {
    if (routine.id === workout.routine_id) {
      return routine;
    }
  });
  return (
    <div className="workout-card">
      <Link to={`/routines/${routine.id}`}>
        <h4>{routine.name}</h4>
      </Link>
      <p className="workout-date">
        {new Date(workout.date).toLocaleDateString(navigator.language, {
          dateStyle: "full",
        })}
      </p>
      <p className="workout-details">
        {workout.duration} minutes • {workout.calories_burned} cals
      </p>
      <p className="workout-notes">{workout.notes}</p>
    </div>
  );
}

export default WorkoutCard;
