import React, { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import { WorkoutContext } from "../workouts/WorkoutContext";
import { RoutineContext } from "../routines/RoutineContext";
import { Link } from "react-router-dom";
import WorkoutCard from "./WorkoutCard";

function Profile() {
  const { user, setUser, setIsLoggedIn } = useContext(UserContext);
  const { userWorkouts, setUserWorkouts } = useContext(WorkoutContext);
  const { routines } = useContext(RoutineContext);
  const [avatar, setAvatar] = useState(null);

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

  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        setUser(null);
        setIsLoggedIn(false);
      }
    });
  }

  const handleAvatarChange = (event) => {
    setAvatar(event.target.files[0]);
  };

  const handleAvatarSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("avatar", avatar);
    fetch(`/users/${user.id}`, {
      method: "PATCH",
      body: formData,
    });
  };

  const workoutCards = userWorkouts.map((workout) => {
    const routine = routines.find(
      (routine) => routine.id === workout.routine_id
    );
    return (
      <WorkoutCard
        key={workout.id}
        workout={workout}
        routine={routine}
        onDeleteWorkout={handleDeleteWorkout}
      />
    );
  });

  return (
    <div className="profile">
      <h3>Workout Profile</h3>
      {user && (
        <>
          <button onClick={handleLogout}>Logout</button>
          <h2>{user.name}</h2>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <div className="avatar-photo">
            {user.avatar && <img src={user.avatar} alt="avatar_photo" />}
          </div>
          <>
            <input
              type="file"
              name="avatar"
              accept="image/*"
              multiple={false}
              onChange={handleAvatarChange}
            />
            <button onClick={handleAvatarSubmit}>
              {user.avatar ? "Change Photo" : "Upload Photo"}
            </button>
          </>
        </>
      )}
      {userWorkouts.length > 0 ? (
        workoutCards
      ) : (
        <>
          <p>You have no workouts. Create a workout!</p>
          <Link to="/routines">View Routines</Link>
        </>
      )}
    </div>
  );
}

export default Profile;
