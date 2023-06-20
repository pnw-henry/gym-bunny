import React, { useState, useContext } from "react";
import ExerciseList from "./ExerciseList";
import MuscleFilter from "./MuscleFilter";
import { ExerciseContext } from "./ExerciseContext";

function Exercises() {
  const { exercises, selectedExercises } = useContext(ExerciseContext);
  const [targetMuscle, setTargetMuscle] = useState("");
  const [showSelected, setShowSelected] = useState(false);

  const handleShowSelected = () => {
    setShowSelected(!showSelected);
  };

  const filteredExercises = exercises.filter((exercise) => {
    if (targetMuscle === "") {
      return exercise;
    } else {
      return exercise.muscle_target === targetMuscle;
    }
  });

  filteredExercises.sort((a, b) => {
    if (a.muscle_target < b.muscle_target) {
      return -1;
    }
    if (a.muscle_target > b.muscle_target) {
      return 1;
    }
    return 0;
  });

  return (
    <main className="exercise-container">
      <section className="exercise-filters">
        <MuscleFilter
          targetMuscle={targetMuscle}
          onTargetMuscleSelect={setTargetMuscle}
        />
        <button className="show-exercises" onClick={handleShowSelected}>
          {showSelected ? "Show All Exercises" : "Show Selected Exercises"}
        </button>
      </section>
      <section>
        <ExerciseList
          exercises={showSelected ? selectedExercises : filteredExercises}
        />
      </section>
    </main>
  );
}

export default Exercises;
