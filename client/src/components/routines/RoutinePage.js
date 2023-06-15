import React from "react";
import { useParams } from "react-router-dom";
import { ExerciseContext } from "../exercises/ExerciseContext";
import { RoutineContext } from "./RoutineContext";
import { UserContext } from "../users/UserContext";
import { WorkoutContext } from "../workouts/WorkoutContext";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

function RoutinePage() {
  const { id } = useParams();
  const { exercises } = useContext(ExerciseContext);
  const { routines } = useContext(RoutineContext);
  const { user } = useContext(UserContext);
  const { userWorkouts, setUserWorkouts } = useContext(WorkoutContext);
  const routine = routines.find((routine) => routine.id === Number(id));
  const navigate = useNavigate();

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

    const response = await fetch("/workouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        routine_id: routine.id,
        user_id: user.id,
        date: formattedDate,
        duration: 0,
        calories_burned: 0,
      }),
    });
    const newWorkout = await response.json();
    setUserWorkouts([...userWorkouts, newWorkout]);
    navigate(`/workout-progress/${newWorkout.id}`);
  };

  return (
    <div className="routine-page">
      <h1>{routine.name}</h1>
      <p>{routine.description}</p>
      <Link to={`/new-workout/${routine.id}`}>
        <button className="new-workout-button">Modify Sets/Reps</button>
      </Link>
      {user ? (
        <button className="begin-workout-button" onClick={handleBeginWorkout}>
          Begin Workout
        </button>
      ) : (
        <p>Log in to begin workout</p>
      )}
      <div className="routine-exercises">
        {routineExercises.length === 0 && (
          <p>This routine has no exercises yet.</p>
        )}
        {routineExercisesWithSets.map((exercise) => {
          return (
            <div className="routine-exercise" key={exercise.id}>
              <h2>{exercise.name}</h2>
              <p>{exercise.description}</p>
              <p>Muscle Target: {exercise.muscle_target}</p>
              <p>Sets: {exercise.sets}</p>
              <p>Reps: {exercise.reps}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RoutinePage;
