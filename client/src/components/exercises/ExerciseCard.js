import React from "react";
import { ExerciseContext } from "./ExerciseContext";
import { useContext } from "react";

function ExerciseCard({ exercise }) {
  const { id, name, description, muscle_target } = exercise;
  const { selectedExercises, setSelectedExercises } =
    useContext(ExerciseContext);

  const handleSelect = () => {
    if (selectedExercises.includes(exercise)) {
      setSelectedExercises(
        selectedExercises.filter((selectedExercise) => {
          return selectedExercise.id !== exercise.id;
        })
      );
    } else {
      setSelectedExercises([...selectedExercises, exercise]);
    }
  };

  return (
    <div className="exercise-card">
      <h2>{name}</h2>
      <p>{description}</p>
      <p>Target Muscle: {muscle_target}</p>
      <button onClick={handleSelect}>
        {selectedExercises.includes(exercise) ? "Remove" : "Add"}
      </button>
    </div>
  );
}

export default ExerciseCard;
