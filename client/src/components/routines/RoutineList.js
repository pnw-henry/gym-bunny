import React from "react";
import RoutineCard from "./RoutineCard";

function RoutineList({ routines, onAddFavorite, onRemoveFavorite }) {
  const routineCards = routines.map((routine) => (
    <RoutineCard
      key={routine.id}
      routine={routine}
      onAddFavorite={onAddFavorite}
      onRemoveFavorite={onRemoveFavorite}
    />
  ));

  return (
    <div className="routine-list">
      {routineCards.length > 0 ? (
        routineCards
      ) : (
        <h2>No routines found. Please try again.</h2>
      )}
    </div>
  );
}

export default RoutineList;
