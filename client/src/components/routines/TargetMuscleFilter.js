import React from "react";
import { RoutineContext } from "./RoutineContext";
import { useContext } from "react";

function TargetMuscleFilter({ targetMuscle, setTargetMuscle }) {
  const { routines } = useContext(RoutineContext);
  const muscle_groups = routines.map((routine) => routine.muscle_group);
  const uniqueMuscleGroups = [...new Set(muscle_groups)];

  const handleChange = (e) => {
    setTargetMuscle(e.target.value);
  };

  const muscleGroupOptions = uniqueMuscleGroups.map((muscle_group) => (
    <option key={muscle_group} value={muscle_group}>
      {muscle_group}
    </option>
  ));

  return (
    <div>
      <label htmlFor="target-muscle">Target Muscle: </label>
      <select
        name="target-muscle"
        id="target-muscle"
        value={targetMuscle}
        onChange={handleChange}
      >
        <option value="">All</option>
        {muscleGroupOptions}
      </select>
    </div>
  );
}

export default TargetMuscleFilter;
