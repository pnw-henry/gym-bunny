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
      <h1 className="title">
        Gym
        <br />
        Bunny
      </h1>

      <Navigation />

      <div className="user-profile">
        {isLoggedIn && user ? (
          <NavLink to="/profile" className="profile-card">
            <img alt={`${user.name}'s profile photo`} src={user.avatar} />
            <div className="user-info">
              <div className="display-name">{user.name}</div>
              <div className="username">@{user.username}</div>
            </div>
          </NavLink>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
    </header>
  );
}

export default Header;
