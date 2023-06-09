import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { RoutineContext } from "../routines/RoutineContext";
import { WorkoutContext } from "../workouts/WorkoutContext";

function Login({ toggleSignup, signUp }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setIsLoggedIn } = useContext(UserContext);
  const { setFavorites } = useContext(RoutineContext);
  const { setUserWorkouts, setUserSweats } = useContext(WorkoutContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const loginApi = "/login";

  function handleLogin(e) {
    e.preventDefault();
    const userData = {
      username: username,
      password: password,
    };
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    fetch(loginApi, config).then((response) => {
      if (response.ok) {
        response.json().then((user) => {
          console.log(user);
          setUser(user);
          setFavorites(user.favorites);
          setUserWorkouts(user.workouts);
          setUserSweats(user.sweats);
          setIsLoggedIn(true);
          navigate("/");
        });
      } else {
        response.json().then((errorData) => {
          console.log(errorData);
          setErrors([errorData]);
        });
      }
    });
  }

  return (
    <div className="login-form">
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="buttons">
          <input type="submit" value="Login" />
          <button onClick={toggleSignup}>{signUp ? "Login" : "Sign Up"}</button>
        </div>
      </form>
      {errors.length > 0 ? (
        <div className="errors">
          {errors.map((e) => (
            <p key={e.errors}>{e.errors}</p>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default Login;
