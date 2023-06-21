import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import { UserContext } from "./UserContext";
import { useContext } from "react";

function LoginPage() {
  const [signUp, setSignUp] = useState(false);
  const navigate = useNavigate();

  const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(UserContext);

  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        setUser(null);
        setIsLoggedIn(false);
        navigate("/");
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
              <SignUp toggleSignup={toggleSignup} signUp={signUp} />
            </div>
          ) : (
            <div className="login">
              <Login toggleSignup={toggleSignup} signUp={signUp} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default LoginPage;
