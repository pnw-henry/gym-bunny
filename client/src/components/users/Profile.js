import React, { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import { WorkoutContext } from "../workouts/WorkoutContext";
import { RoutineContext } from "../routines/RoutineContext";
import { Link } from "react-router-dom";
import WorkoutCard from "./WorkoutCard";

function Profile() {
  const { user, setUser, setIsLoggedIn } = useContext(UserContext);
  const { userWorkouts, setUserWorkouts } = useContext(WorkoutContext);
  const { routines, setFavorites } = useContext(RoutineContext);
  const [avatar, setAvatar] = useState(null);

  if (!user) {
    return <div></div>;
  }

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
        setUserWorkouts([]);
        setFavorites([]);
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

  userWorkouts.map((workout) => {
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
    <main className="profile">
      {user ? (
        <section>
          <div className="profile-details">
            <h2>{user.name}</h2>
            {user.avatar && (
              <img
                className="avatar-photo"
                src={user.avatar}
                alt={`${user.name}'s avatar`}
              />
            )}
            <p>{user.email}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
          {!user.avatar && (
            <div className="avatar-upload">
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
            </div>
          )}
          <div className="profile workouts">
            {userWorkouts.length === 0 ? (
              <div>
                <p>You have no workouts.</p>
                <Link to="/routines">Browse Workout Routines</Link>
              </div>
            ) : (
              <div>
                <h2>Workouts</h2>
                {userWorkouts.map((workout) => {
                  return (
                    <WorkoutCard
                      key={workout.id}
                      workout={workout}
                      onDeleteWorkout={handleDeleteWorkout}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </section>
      ) : (
        <div>
          <p>Please login or sign up</p>
          <Link to="/login">Login</Link>
        </div>
      )}
    </main>
  );
}

export default Profile;
