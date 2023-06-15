import React, { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import { Link } from "react-router-dom";

function WorkoutCard({ workout, routine, onDeleteWorkout }) {
  const [showDetails, setShowDetails] = useState(false);
  const { id, name, date, duration, calories_burned } = workout;
  const { user } = useContext(UserContext);

  const handleDelete = () => {
    onDeleteWorkout(id);
  };

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="workout-container">
      <h1>{name}</h1>
      <p>Date: {date}</p>
      <p>Duration: {duration} minutes</p>
      <p>Calories Burned: {calories_burned} calories</p>
      <button onClick={handleShowDetails}>
        {showDetails ? "Hide Details" : "Show Details"}
      </button>
      {showDetails && (
        <div className="workout-details">
          <h3>Routine: {routine.name}</h3>
          <p>Description: {routine.description}</p>
          <p>Exercises:</p>
          <ul>
            {routine.exercises.map((exercise) => (
              <li key={exercise.id}>{exercise.name}</li>
            ))}
          </ul>
        </div>
      )}
      {user && (
        <div className="workout-buttons">
          <Link to={`/workout-progress/${id}`}>
            <button className="workout-progress-button">
              Workout Progress
            </button>
          </Link>
          <Link to={`/routines/${routine.id}`}>
            <button className="routine-button">Routine</button>
          </Link>
          <button className="delete-button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default WorkoutCard;
