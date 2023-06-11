import React, { useState } from "react";
import ExerciseList from "./ExerciseList";
import MuscleFilter from "./MuscleFilter";
import { ExerciseContext } from "./ExerciseContext";
import { UserContext } from "../users/UserContext";
import { useContext } from "react";

function Exercises() {
  const { exercises, selectedExercises } = useContext(ExerciseContext);
  const { user } = useContext(UserContext);
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
    <div className="exercises-container">
      <MuscleFilter
        targetMuscle={targetMuscle}
        onTargetMuscleSelect={setTargetMuscle}
      />
      <button className="show-exercises" onClick={handleShowSelected}>
        {showSelected ? "Show All Exercises" : "Show Selected Exercises"}
      </button>
      {showSelected ? <h1>Selected Exercises</h1> : <h1>All Exercises</h1>}
      <ExerciseList
        exercises={showSelected ? selectedExercises : filteredExercises}
      />
    </div>
  );
}

export default Exercises;
