import React, { useContext } from "react";
import Logo from "./Logo";
import { UserContext } from "../users/UserContext";
import { NavLink } from "react-router-dom";
import Navigation from "./Navigation";

function Header() {
  const { user, isLoggedIn } = useContext(UserContext);
  return (
    <header>
      <NavLink to="/">
        <Logo />
      </NavLink>
      <h1 className="title">Gym Bunny</h1>

      <Navigation />

      <div className="login">
        {isLoggedIn && user ? (
          <div className="welcome">
            <NavLink to="/profile">{user.name}</NavLink>
          </div>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
    </header>
  );
}

export default Header;
