import React, { useState } from "react";
import RoutineList from "./RoutineList";
import RoutineSearch from "./RoutineSearch";
import TargetMuscleFilter from "./TargetMuscleFilter";
import { useContext } from "react";
import { UserContext } from "../users/UserContext";
import { RoutineContext } from "./RoutineContext";

function Routines() {
  const { user } = useContext(UserContext);
  const { routines, setRoutines, favorites, setFavorites } =
    useContext(RoutineContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [targetMuscle, setTargetMuscle] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const filteredRoutines = routines
    .filter((routine) => {
      return routine.name.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .filter((routine) => {
      return routine.muscle_group
        .toLowerCase()
        .includes(targetMuscle.toLowerCase());
    })
    .filter((routine) => {
      return showFavorites
        ? favorites.find((favorite) => favorite.routine_id === routine.id)
        : true;
    })
    .sort((a, b) => {
      return a.name.localeCompare(b.name);
    });

  const handleAddFavorite = (newFavorite) => {
    const updatedFavorites = [...favorites, newFavorite];
    setFavorites(updatedFavorites);
  };

  const handleRemoveFavorite = (id) => {
    const updatedFavorites = favorites.filter((favorite) => favorite.id !== id);
    setFavorites(updatedFavorites);
  };

  return (
    <main className="routines-container">
      <section className="search">
        <RoutineSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <div className="search-filters">
          <TargetMuscleFilter
            targetMuscle={targetMuscle}
            setTargetMuscle={setTargetMuscle}
          />
          <input
            type="checkbox"
            id="favorites"
            name="favorites"
            value="favorites"
            checked={showFavorites}
            onChange={toggleFavorites}
          />
          <label htmlFor="favorites">Show Favorites</label>
        </div>
      </section>
      <section>
        <RoutineList
          routines={filteredRoutines}
          onAddFavorite={handleAddFavorite}
          onRemoveFavorite={handleRemoveFavorite}
        />
      </section>
    </main>
  );
}

export default Routines;
