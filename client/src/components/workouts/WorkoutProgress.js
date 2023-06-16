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
  const [workout, setWorkout] = useState([]);
  const [routine, setRoutine] = useState([]);
  const [routineSweats, setRoutineSweats] = useState([]);
  const [duration, setDuration] = useState([]);
  const [calories, setCalories] = useState([]);

  useEffect(() => {
    const workout = userWorkouts.find(
      (workout) => workout.id === Number(workoutId)
    );
    if (workout) {
      const routine = routines.find(
        (routine) => routine.id === workout.routine_id
      );
      if (routine) {
        const filteredSweats = routine.exercises.reduce(
          (accumulator, exercise) => {
            const exerciseSweats = user.sweats.filter(
              (sweat) =>
                sweat.routine_id === routine.id &&
                sweat.exercise_id === exercise.id
            );
            if (exerciseSweats.length > 0) {
              exerciseSweats.sort(
                (a, b) => new Date(a.created_at) - new Date(b.created_at)
              );
              accumulator.push(exerciseSweats[0]);
            }
            return accumulator;
          },
          []
        );
        setRoutineSweats(filteredSweats);
        setWorkout(workout);
        setRoutine(routine);
      }
    }
  }, [workoutId, user, userWorkouts, routines]);

  const handleRepsChange = (index, value, predefinedWeight, predefinedSets) => {
    const updatedSweats = [...routineSweats];
    const exercise = routine.exercises[index];
    const sweat = updatedSweats.find(
      (sweat) => sweat && sweat.exercise_id === exercise.id
    );
    if (sweat) {
      sweat.reps = parseInt(value, 10);
      setRoutineSweats(updatedSweats);
    } else {
      const newSweat = {
        exercise_id: exercise.id,
        routine_id: routine.id,
        user_id: user.id,
        reps: parseInt(value, 10),
        sets: predefinedSets,
        weight: predefinedWeight,
      };
      updatedSweats.push(newSweat);
      setRoutineSweats(updatedSweats);
    }
  };

  const handleSetsChange = (index, value, predefinedReps, predefinedWeight) => {
    const updatedSweats = [...routineSweats];
    const exercise = routine.exercises[index];
    const sweat = updatedSweats.find(
      (sweat) => sweat && sweat.exercise_id === exercise.id
    );
    if (sweat) {
      sweat.sets = parseInt(value, 10);
      setRoutineSweats(updatedSweats);
    } else {
      const newSweat = {
        exercise_id: exercise.id,
        routine_id: routine.id,
        user_id: user.id,
        reps: predefinedReps,
        sets: parseInt(value, 10),
        weight: predefinedWeight,
      };
      updatedSweats.push(newSweat);
      setRoutineSweats(updatedSweats);
    }
  };

  const handleWeightChange = (index, value, predefinedReps, predefinedSets) => {
    const updatedSweats = [...routineSweats];
    const exercise = routine.exercises[index];
    const sweat = updatedSweats.find(
      (sweat) => sweat && sweat.exercise_id === exercise.id
    );
    if (sweat) {
      sweat.weight = parseFloat(value);
      setRoutineSweats(updatedSweats);
    } else {
      const newSweat = {
        exercise_id: exercise.id,
        routine_id: routine.id,
        user_id: user.id,
        reps: predefinedReps,
        sets: predefinedSets,
        weight: parseFloat(value),
      };
      updatedSweats.push(newSweat);
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
      };
    });
    const workoutData = {
      ...workout,
      duration: duration,
      calories_burned: calories,
      date: formattedDate,
    };
    console.log("sweatData", sweatData);
    console.log("workoutData", workoutData);
  };

  if (workout.length === 0 || routine.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="workout-progress">
      <h3>Workout Progress</h3>
      <p>{routine.name}</p>
      {routine.exercises.map((exercise, index) => {
        const sweat = routineSweats.find(
          (sweat) => sweat && sweat.exercise_id === exercise.id
        );
        const predefinedSets = routine.exercise_sets.find(
          (set) => set.exercise_id === exercise.id
        );
        const predefinedReps = predefinedSets ? predefinedSets.reps : "";
        const predefinedSetsNumber = predefinedSets
          ? predefinedSets.set_number
          : "";
        const predefinedWeight = 0;
        return (
          <div key={exercise.id} className="exercise-item">
            <h4>{exercise.name}</h4>
            <div className="exercise-form">
              <label htmlFor={`sets${index}`}>Sets:</label>
              <input
                type="number"
                id={`sets${index}`}
                name={`sets${index}`}
                value={sweat ? sweat.sets : predefinedSetsNumber}
                onChange={(e) =>
                  handleSetsChange(
                    index,
                    e.target.value,
                    predefinedReps,
                    predefinedWeight
                  )
                }
              />
              <label htmlFor={`reps${index}`}>Reps:</label>
              <input
                type="number"
                id={`reps${index}`}
                name={`reps${index}`}
                value={sweat ? sweat.reps : predefinedReps}
                onChange={(e) =>
                  handleRepsChange(
                    index,
                    e.target.value,
                    predefinedWeight,
                    predefinedSetsNumber
                  )
                }
              />
              <label htmlFor={`weight${index}`}>Weight (lbs):</label>
              <input
                type="number"
                id={`weight${index}`}
                name={`weight${index}`}
                value={sweat ? sweat.weight : predefinedWeight}
                onChange={(e) =>
                  handleWeightChange(
                    index,
                    e.target.value,
                    predefinedReps,
                    predefinedSetsNumber
                  )
                }
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
