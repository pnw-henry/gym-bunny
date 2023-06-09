import React, { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import { WorkoutContext } from "../workouts/WorkoutContext";
import { RoutineContext } from "../routines/RoutineContext";
import { Link } from "react-router-dom";

function WorkoutCard({ workout, onDeleteWorkout }) {
  const [showDetails, setShowDetails] = useState(false);
  const { id, date, duration, calories_burned } = workout;
  const { user } = useContext(UserContext);
  const { userWorkouts, setUserWorkouts, userSweats } =
    useContext(WorkoutContext);
  const { routines } = useContext(RoutineContext);
  const [editing, setEditing] = useState(false);
  const [editedNotes, setEditedNotes] = useState(workout.notes);
  const [errors, setErrors] = useState([]);
  const workoutApi = `/workouts/${id}`;

  const routine = routines.find((routine) => routine.id === workout.routine_id);

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
    <main className="user-profile-workouts">
      {user && routine && (
        <div className="workout-card">
          <h4>{routine.name}</h4>
          <p className="workout-date">
            {new Date(date).toLocaleDateString(navigator.language, {
              dateStyle: "full",
            })}
          </p>
          <div className="workout-numbers">
            <p>{duration} minutes</p>
            <p>{calories_burned} calories burned</p>
          </div>
          <div className="buttons">
            <button className="btn-small" onClick={handleShowDetails}>
              {showDetails ? "Hide Details" : "Show Details"}
            </button>
          </div>
          {showDetails && (
            <div className="profile-workout-details">
              {editing ? (
                <div>
                  <textarea
                    value={editedNotes}
                    onChange={handleNotesChange}
                  ></textarea>
                  <button className="btn-small" onClick={handleCancelClick}>
                    Cancel
                  </button>
                  <button className="btn-small" onClick={handleNotesEdit}>
                    Save
                  </button>
                  {errors.map((error) => (
                    <p key={error}>{error}</p>
                  ))}
                </div>
              ) : (
                <div className="workout-notes">
                  <p>Notes: {workout.notes}</p>
                  <button className="btn-small" onClick={handleEditClick}>
                    Edit Notes
                  </button>
                </div>
              )}
              <div className="exercise-details">
                {userSweats.length !== 0 ? (
                  <div>
                    <h2>Exercises</h2>
                    {routine.exercises.map((exercise) => (
                      <div key={exercise.id}>
                        {userSweats.map((sweat) => {
                          return (
                            <div key={sweat.id}>
                              {sweat.exercise_id === exercise.id &&
                                sweat.workout_id === workout.id && (
                                  <div>
                                    <h4>{exercise.name}</h4>
                                    <p>Weight: {sweat.weight} lbs</p>
                                    <p>Reps: {sweat.reps}</p>
                                    <p>Sets: {sweat.sets}</p>
                                  </div>
                                )}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No exercises logged</p>
                )}
              </div>
              <div className="buttons">
                <Link to={`/routines/${routine.id}`}>
                  <button className="btn-small routine-button">
                    Go To Routine
                  </button>
                </Link>
                <button
                  className="btn-small delete-button"
                  onClick={handleDelete}
                >
                  Delete Workout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
}

export default WorkoutCard;
