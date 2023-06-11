import React, { useState } from "react";
import { WorkoutContext } from "./WorkoutContext";
import { UserContext } from "../users/UserContext";
import { RoutineContext } from "../routines/RoutineContext";
import { useParams } from "react-router-dom";
import { useContext } from "react";

function WorkoutProgress() {
  const { workoutId } = useParams();
  const { user } = useContext(UserContext);
  const { routines } = useContext(RoutineContext);
  const { userSets, setUserSets, userReps, setUserReps, userWorkouts } =
    useContext(WorkoutContext);

  const workout = userWorkouts.find(
    (workout) => workout.id === Number(workoutId)
  );
  console.log("workout in workoutprogress", workout);
  if (!workout) {
    return <div>Loading...</div>;
  }
  const routine = routines.find((routine) => routine.id === workout.routine_id);
  if (!routine) {
    return <div>Loading...</div>;
  }

  const handleSetNumberChange = (exerciseId, value) => {
    setUserSets((prev) => ({
      ...prev,
      [exerciseId]: value,
    }));
  };

  const handleRepsNumberChange = (exerciseId, value) => {
    setUserReps((prev) => ({
      ...prev,
      [exerciseId]: value,
    }));
  };

  return (
    <div className="workout-progress">
      <h3>Workout Progress</h3>
      <p>Workout Progress</p>
    </div>
  );
}

export default WorkoutProgress;
