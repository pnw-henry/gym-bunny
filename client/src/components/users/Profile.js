import React, { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import { WorkoutContext } from "../workouts/WorkoutContext";
import { RoutineContext } from "../routines/RoutineContext";
import { Link } from "react-router-dom";
import WorkoutCard from "./WorkoutCard";

function Profile() {
  const { user } = useContext(UserContext);
  const { userWorkouts, setUserWorkouts } = useContext(WorkoutContext);
  const { routines } = useContext(RoutineContext);

  console.log("user in profile", user);
  console.log("userWorkouts in profile", userWorkouts);

  const handleDeleteWorkout = (workoutId) => {
    fetch(`/workouts/${workoutId}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        const newWorkouts = userWorkouts.filter(
          (workout) => workout.id !== workoutId
        );
        setUserWorkouts(newWorkouts);
      }
    });
  };

  const workoutCards = userWorkouts.map((workout) => {
    const routine = routines.find(
      (routine) => routine.id === workout.routine_id
    );
    if (workout.duration > 0) {
      return (
        <WorkoutCard
          key={workout.id}
          workout={workout}
          routine={routine}
          onDeleteWorkout={handleDeleteWorkout}
        />
      );
    }
  });

  return (
    <div className="profile">
      <h3>Profile</h3>
      {user && (
        <>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </>
      )}
      <h3>Workouts</h3>
      {userWorkouts.length > 0 ? (
        workoutCards
      ) : (
        <p>You have no workouts. Create a workout!</p>
      )}
      <Link to="/routines">View Routines</Link>
    </div>
  );
}

export default Profile;
