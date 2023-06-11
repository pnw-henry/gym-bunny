import React from "react";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav>
      <NavLink
        to="/routines"
        className={(isActive) => "nav-link" + (!isActive ? " unselected" : "")}
      >
        Workout Routines
      </NavLink>
      <NavLink
        to="/exercises"
        className={(isActive) => "nav-link" + (!isActive ? " unselected" : "")}
      >
        All Exercises
      </NavLink>
      <NavLink
        to="/profile"
        className={(isActive) => "nav-link" + (!isActive ? " unselected" : "")}
      >
        Profile
      </NavLink>
    </nav>
  );
}

export default Navigation;
