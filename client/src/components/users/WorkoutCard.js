import React, { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import { WorkoutContext } from "../workouts/WorkoutContext";
import { ExerciseContext } from "../exercises/ExerciseContext";
import { Link } from "react-router-dom";

function WorkoutCard({ workout, routine, onDeleteWorkout }) {
  const [showDetails, setShowDetails] = useState(false);
  const { id, date, duration, calories_burned } = workout;
  const { user } = useContext(UserContext);
  const { userWorkouts, setUserWorkouts, userSweats } =
    useContext(WorkoutContext);
  const { exercises } = useContext(ExerciseContext);
  const [editing, setEditing] = useState(false);
  const [editedNotes, setEditedNotes] = useState(workout.notes);
  const [errors, setErrors] = useState([]);
  const workoutApi = `/workouts/${id}`;

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelClick = () => {
    setEditing(false);
    setEditedNotes(workout.notes);
  };

  const handleNotesChange = (event) => {
    setEditedNotes(event.target.value);
  };

  const handleNotesEdit = () => {
    const editedWorkout = {
      ...workout,
      notes: editedNotes,
    };
    fetch(workoutApi, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedWorkout),
    }).then((response) => {
      if (response.ok) {
        response.json().then((workout) => {
          setEditing(false);
          setUserWorkouts(
            userWorkouts.map((workout) => {
              if (workout.id === id) {
                return {
                  ...workout,
                  notes: editedNotes,
                };
              }
              return workout;
            })
          );
        });
      } else {
        response.json().then((errors) => {
          setErrors(errors);
        });
      }
    });
  };

  const handleDelete = () => {
    onDeleteWorkout(id);
  };

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="workout-container">
      {user ? (
        <div>
          <h2>{routine.name}</h2>
          <p>Date: {date}</p>
          <p>Duration: {duration} minutes</p>
          <p>Calories Burned: {calories_burned} calories</p>
          <button onClick={handleShowDetails}>
            {showDetails ? "Hide Details" : "Show Details"}
          </button>
          {showDetails && (
            <div>
              {editing ? (
                <div>
                  <textarea
                    value={editedNotes}
                    onChange={handleNotesChange}
                  ></textarea>
                  <button onClick={handleCancelClick}>Cancel</button>
                  <button onClick={handleNotesEdit}>Save</button>
                  {errors.map((error) => (
                    <p key={error}>{error}</p>
                  ))}
                </div>
              ) : (
                <div>
                  <p>Notes: {workout.notes}</p>
                  <button onClick={handleEditClick}>Edit Notes</button>
                </div>
              )}
              <div className="exercise-details">
                {userSweats.length !== 0 ? (
                  <div>
                    <h3>Exercises</h3>
                    {exercises.map((exercise) => (
                      <div key={exercise.id}>
                        {userSweats.map((sweat) => (
                          <div key={sweat.id}>
                            {sweat.exercise_id === exercise.id &&
                              sweat.workout_id === workout.id && (
                                <div>
                                  <p>{exercise.name}</p>
                                  <p>Weight: {sweat.weight} lbs</p>
                                  <p>Reps: {sweat.reps}</p>
                                  <p>Sets: {sweat.sets}</p>
                                </div>
                              )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No exercises logged</p>
                )}
              </div>
              <div className="workout-buttons">
                <Link to={`/routines/${routine.id}`}>
                  <button className="routine-button">Go To Routine</button>
                </Link>
                <button className="delete-button" onClick={handleDelete}>
                  Delete Workout
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <p>Login First</p>
        </div>
      )}
    </div>
  );
}

export default WorkoutCard;
