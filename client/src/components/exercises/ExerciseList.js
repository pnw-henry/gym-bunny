import React from "react";
import ExerciseCard from "./ExerciseCard";
function ExerciseList({ exercises }) {
  const exerciseCards = exercises.map((exercise) => (
    <ExerciseCard key={exercise.id} exercise={exercise} />
  ));

  return (
    <div className="exercise-list">
      {exerciseCards.length > 0 ? (
        exerciseCards
      ) : (
        <h4>You haven't selected any exercises.</h4>
      )}
    </div>
  );
}

export default ExerciseList;
