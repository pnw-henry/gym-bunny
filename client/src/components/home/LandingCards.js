import React from "react";
import { Link } from "react-router-dom";

function LandingCards({ routine }) {
  return (
    <div className="routine-card">
      <h4>{routine.name}</h4>
      <Link to={`/routines/${routine.id}`}>
        <img src={routine.routine_photo} alt={routine.name} />
      </Link>
      <p>{routine.description}</p>
    </div>
  );
}

export default LandingCards;
