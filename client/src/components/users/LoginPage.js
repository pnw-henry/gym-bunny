import React, { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import { UserContext } from "./UserContext";
import { useContext } from "react";

function LoginPage() {
  const [errors, setErrors] = useState([]);
  const [signUp, setSignUp] = useState(false);

  const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(UserContext);

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

  const toggleSignup = () => {
    setSignUp(!signUp);
  };

  return (
    <div className="login-page">
      {isLoggedIn && user ? (
        <div className="welcome">
          <h1>Welcome, {user.username}!</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="login-signup-button">
          {signUp ? (
            <div className="signup">
              <SignUp
                errors={errors}
                setErrors={setErrors}
                toggleSignup={toggleSignup}
                signUp={signUp}
              />
            </div>
          ) : (
            <div className="login">
              <Login
                errors={errors}
                setErrors={setErrors}
                toggleSignup={toggleSignup}
                signUp={signUp}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default LoginPage;
