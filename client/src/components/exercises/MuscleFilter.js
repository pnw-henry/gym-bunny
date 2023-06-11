import React from "react";
import { ExerciseContext } from "./ExerciseContext";
import { useContext } from "react";

function MuscleFilter({ targetMuscle, onTargetMuscleSelect }) {
  const { exercises } = useContext(ExerciseContext);

  const muscle_targets = exercises.map((exercise) => exercise.muscle_target);
  const unique_muscle_targets = [...new Set(muscle_targets)];

  const muscleOptions = unique_muscle_targets.map((muscle) => (
    <option key={muscle} value={muscle}>
      {muscle}
    </option>
  ));

  const handleChange = (e) => {
    onTargetMuscleSelect(e.target.value);
  };

  return (
    <div className="muscle-filter">
      <label htmlFor="target-muscle">Filter by Target Muscle:</label>
      <select
        name="target-muscle"
        id="target-muscle"
        onChange={handleChange}
        defaultValue={targetMuscle}
      >
        <option value="">All</option>
        {muscleOptions}
      </select>
    </div>
  );
}

export default MuscleFilter;
