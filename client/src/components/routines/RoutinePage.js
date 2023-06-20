import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ExerciseContext } from "../exercises/ExerciseContext";
import { RoutineContext } from "./RoutineContext";
import { UserContext } from "../users/UserContext";
import { WorkoutContext } from "../workouts/WorkoutContext";
import { Link, useNavigate } from "react-router-dom";

function RoutinePage() {
  const { id } = useParams();
  const { exercises } = useContext(ExerciseContext);
  const { routines } = useContext(RoutineContext);
  const { user } = useContext(UserContext);
  const { userWorkouts, setUserWorkouts } = useContext(WorkoutContext);
  const [errors, setErrors] = useState([]);

  const routine = routines.find((routine) => routine.id === Number(id));
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!routine) {
    return <div>Loading...</div>;
  }

  const routineExercises = routine.exercise_sets.map((exercise_set) => {
    return exercises.find(
      (exercise) => exercise.id === exercise_set.exercise_id
    );
  });

  const routineExercisesWithSets = routineExercises.map((exercise, index) => {
    return {
      ...exercise,
      sets: routine.exercise_sets[index].set_number,
      reps: routine.exercise_sets[index].reps,
    };
  });

  const handleBeginWorkout = async () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];

    const workoutObj = {
      routine_id: routine.id,
      user_id: user.id,
      date: formattedDate,
      duration: 0,
      calories_burned: 0,
    };

    const response = await fetch("/workouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workoutObj),
    });
    if (response.ok) {
      const newWorkout = await response.json();
      console.log("newWorkout", newWorkout);
      setUserWorkouts([...userWorkouts, newWorkout]);
      navigate(`/workout-progress/${newWorkout.id}`);
    } else {
      const errorData = await response.json();
      console.log("errorData", errorData);
      setErrors(errorData.errors);
    }
  };

  return (
    <main className="routine-page">
      <section className="routine-info">
        <h1>{routine.name}</h1>
        <p>{routine.description}</p>
        {user ? (
          <button className="begin-workout-button" onClick={handleBeginWorkout}>
            Begin Workout
          </button>
        ) : (
          <Link to="/login">Login to begin workout.</Link>
        )}
      </section>
      <section className="routine-exercises">
        {routineExercises.length === 0 && (
          <p>This routine has no exercises yet.</p>
        )}
        {routineExercisesWithSets.map((exercise) => {
          return (
            <div className="routine-exercise-card" key={exercise.id}>
              {exercise.exercise_photo && (
                <img
                  className="routine-exercise-photo"
                  src={exercise.exercise_photo}
                  alt="exercise_photo"
                />
              )}
              <div className="routine-exercise-info">
                <h2>{exercise.name}</h2>
                <p>{exercise.description}</p>
                <p>Targets {exercise.muscle_target} muscles.</p>
                <p>
                  Begin with {exercise.sets} sets and {exercise.reps} reps.
                </p>
              </div>
            </div>
          );
        })}
      </section>
      {errors.length > 0 && (
        <div className="errors">
          {errors.map((error) => (
            <div key={error}>{error}</div>
          ))}
        </div>
      )}
    </main>
  );
}

export default RoutinePage;
