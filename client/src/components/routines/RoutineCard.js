import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../users/UserContext";
import { RoutineContext } from "./RoutineContext";
import { useContext } from "react";

function RoutineCard({ routine, onAddFavorite, onRemoveFavorite }) {
  const { id, name, description, owner } = routine;
  const { user } = useContext(UserContext);
  const { favorites } = useContext(RoutineContext);
  //const [photo, setPhoto] = useState(null);

  const handleAddFavorite = () => {
    fetch(`/favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        routine_id: id,
        user_id: user.id,
      }),
    })
      .then((res) => res.json())
      .then((newFavorite) => {
        onAddFavorite(newFavorite);
      });
  };
  /*
  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handlePhotoSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("routine_photo", photo);
    fetch(`/routines/${id}`, {
      method: "PATCH",
      body: formData,
    });
  };

  */

  const handleDeleteFavorite = () => {
    const favoriteToDelete = favorites.find(
      (favorite) => favorite.routine_id === id
    );
    fetch(`/favorites/${favoriteToDelete.id}`, {
      method: "DELETE",
    }).then(() => {
      onRemoveFavorite(favoriteToDelete.id);
    });
  };

  return (
    <div className="routine-card">
      <h2>{name}</h2>
      <p>{description}</p>
      <Link to={`/routines/${id}`}>
        <div className="routine-photo">
          {routine.routine_photo && (
            <img src={routine.routine_photo} alt="routine_photo" />
          )}
        </div>
      </Link>
      <p>By: {owner}</p>
      {user && !favorites.find((favorite) => favorite.routine_id === id) && (
        <button onClick={handleAddFavorite}>Add Favorite</button>
      )}
      {user && favorites.find((favorite) => favorite.routine_id === id) && (
        <button onClick={handleDeleteFavorite}>Remove Favorite</button>
      )}
    </div>
  );
}

export default RoutineCard;
