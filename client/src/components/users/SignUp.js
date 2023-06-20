import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { RoutineContext } from "../routines/RoutineContext";
import { WorkoutContext } from "../workouts/WorkoutContext";

function SignUp({ toggleSignup, signUp }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [errors, setErrors] = useState([]);

  const { setUser, setIsLoggedIn } = useContext(UserContext);
  const { setFavorites } = useContext(RoutineContext);
  const { setUserWorkouts, setUserSweats } = useContext(WorkoutContext);
  const navigate = useNavigate();
  const signupApi = "/users";

  function handleNewUserSubmit(e) {
    e.preventDefault();
    const userData = {
      name: name,
      email: email,
      email_confirmation: confirmEmail,
      username: username,
      password: password,
      password_confirmation: confirmPassword,
    };
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    fetch(signupApi, config).then((response) => {
      if (response.ok) {
        response.json().then((user) => {
          console.log(user);
          setIsLoggedIn(true);
          setUser(user);
          setFavorites(user.favorites);
          setUserWorkouts(user.workouts);
          setUserSweats(user.sweats);
          navigate("/");
        });
      } else {
        response.json().then((errorData) => {
          setErrors(errorData.errors);
        });
      }
    });
  }

  return (
    <div className="signup-form">
      <form onSubmit={handleNewUserSubmit}>
        <fieldset>
          <input
            type="text"
            placeholder="Name"
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <input
            type="text"
            placeholder="Email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <input
            type="text"
            placeholder="Confirm Email"
            autoComplete="off"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <input
            type="text"
            placeholder="Username"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <input
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <input
            type="password"
            placeholder="Password Confirmation"
            autoComplete="current-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </fieldset>

        <fieldset className="buttons">
          <input type="submit" value="Sign Up" />
          <button onClick={toggleSignup}>{signUp ? "Login" : "Sign Up"}</button>
        </fieldset>
      </form>
      {errors.length > 0 ? (
        <div className="errors">
          <p>There were errors with your submission:</p>
          <ul>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default SignUp;
