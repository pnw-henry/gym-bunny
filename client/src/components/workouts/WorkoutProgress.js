import React, { useState, useContext, useEffect } from "react";
import { WorkoutContext } from "./WorkoutContext";
import { UserContext } from "../users/UserContext";
import { RoutineContext } from "../routines/RoutineContext";
import { useParams } from "react-router-dom";

function WorkoutProgress() {
  const { workoutId } = useParams();
  const { user } = useContext(UserContext);
  const { routines } = useContext(RoutineContext);
  const { userWorkouts } = useContext(WorkoutContext);
  const [routineSweats, setRoutineSweats] = useState([]);
  const [workout, setWorkout] = useState({});
  const [routine, setRoutine] = useState({});
  const [sets, setSets] = useState([]);
  const [reps, setReps] = useState([]);
  const [weight, setWeight] = useState([]);
  const [duration, setDuration] = useState([]);
  const [calories, setCalories] = useState([]);

  console.log("workout id", workoutId);

  useEffect(() => {
    const workout = userWorkouts.find(
      (workout) => workout.id === Number(workoutId)
    );
    if (workout) {
      const routine = routines.find(
        (routine) => routine.id === workout.routine_id
      );
      if (routine) {
        const filteredSweats = routine.exercises.map((exercise) => {
          const exerciseSweats = user.sweats.filter(
            (sweat) =>
              sweat.routine_id === routine.id &&
              sweat.exercise_id === exercise.id
          );
          if (exerciseSweats.length > 0) {
            exerciseSweats.sort(
              (a, b) => new Date(a.created_at) - new Date(b.created_at)
            );
            return exerciseSweats[0];
          } else {
            return null;
          }
        });
        setRoutineSweats(filteredSweats);
        setWorkout(workout);
        setRoutine(routine);
      }
    }
  }, [workoutId, user, userWorkouts, routines, user.sweats]);

  console.log("routineSweats", routineSweats);
  console.log("workout", workout);
  console.log("routine", routine);

  const handleRepsChange = (index, value) => {
    const updatedSweats = [...routineSweats];
    const sweat = updatedSweats.find(
      (sweat) => sweat.exercise_id === routine.exercises[index].id
    );
    if (sweat) {
      sweat.reps = value;
      setRoutineSweats(updatedSweats);
    }
  };

  const handleSetsChange = (index, value) => {
    const updatedSweats = [...routineSweats];
    const sweat = updatedSweats.find(
      (sweat) => sweat.exercise_id === routine.exercises[index].id
    );
    if (sweat) {
      sweat.sets = value;
      setRoutineSweats(updatedSweats);
    }
  };

  const handleWeightChange = (index, value) => {
    const updatedSweats = [...routineSweats];
    const sweat = updatedSweats.find(
      (sweat) => sweat.exercise_id === routine.exercises[index].id
    );
    if (sweat) {
      sweat.weight = value;
      setRoutineSweats(updatedSweats);
    }
  };

  const handleSubmit = (event) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
    event.preventDefault();
    const sweatData = routineSweats.map((sweat) => {
      return {
        ...sweat,
        workout_id: workout.id,
      };
    });
    const workoutData = {
      ...workout,
      duration: duration,
      calories: calories,
      date: formattedDate,
    };
    console.log("sweatData", sweatData);
    console.log("workoutData", workoutData);
  };

  return (
    <div className="workout-progress">
      <h3>Workout Progress</h3>
      <p>{routine.name}</p>
      {routine.exercises.map((exercise, index) => {
        const sweat = routineSweats.find(
          (sweat) => sweat.exercise_id === exercise.id
        );
        return (
          <div key={exercise.id} className="exercise-item">
            <h4>{exercise.name}</h4>
            <div className="exercise-form">
              <label htmlFor={`sets${index}`}>Sets:</label>
              <input
                type="number"
                id={`sets${index}`}
                name={`sets${index}`}
                value={sweat ? sweat.sets : ""}
                onChange={(e) => handleSetsChange(index, e.target.value)}
              />
              <label htmlFor={`reps${index}`}>Reps:</label>
              <input
                type="number"
                id={`reps${index}`}
                name={`reps${index}`}
                value={sweat ? sweat.reps : ""}
                onChange={(e) => handleRepsChange(index, e.target.value)}
              />
              <label htmlFor={`weight${index}`}>Weight (lbs):</label>
              <input
                type="number"
                id={`weight${index}`}
                name={`weight${index}`}
                value={sweat ? sweat.weight : ""}
                onChange={(e) => handleWeightChange(index, e.target.value)}
              />
            </div>
          </div>
        );
      })}
      <div className="workout-form">
        <label htmlFor="duration">Duration (minutes):</label>
        <input
          type="number"
          id="duration"
          name="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <label htmlFor="calories">Calories Burned:</label>
        <input
          type="number"
          id="calories"
          name="calories"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default WorkoutProgress;
