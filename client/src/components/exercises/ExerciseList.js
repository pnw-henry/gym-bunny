import React from "react";
import ExerciseCard from "./ExerciseCard";
function ExerciseList({ exercises }) {
  const exerciseCards = exercises.map((exercise) => (
    <ExerciseCard key={exercise.id} exercise={exercise} />
  ));

  return (
    <div className="exercise-list">
      {exerciseCards.length > 0 ? exerciseCards : <h2>No exercises found.</h2>}
    </div>
  );
}

export default ExerciseList;
