import React, { useContext } from "react";
import { ExerciseContext } from "./ExerciseContext";

function ExerciseCard({ exercise }) {
  const { id, name, description, muscle_target } = exercise;
  const { selectedExercises, setSelectedExercises } =
    useContext(ExerciseContext);
  //const [photo, setPhoto] = useState(null);

  const handleSelect = () => {
    if (selectedExercises.includes(exercise)) {
      setSelectedExercises(
        selectedExercises.filter((selectedExercise) => {
          return selectedExercise.id !== exercise.id;
        })
      );
    } else {
      setSelectedExercises([...selectedExercises, exercise]);
    }
  };
  /*
  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handlePhotoSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("exercise_photo", photo);
    fetch(`/exercises/${id}`, {
      method: "PATCH",
      body: formData,
    });
  };

  */

  return (
    <div className="exercise-card">
      {exercise.exercise_photo && (
        <img
          className="exercise-photo"
          src={exercise.exercise_photo}
          alt="exercise_photo"
        />
      )}
      <div className="exercise-details">
        <h2>{name}</h2>
        <p>{description}</p>
        <p className="exercise-muscle-target">Targets the {muscle_target}.</p>
      </div>
      <button className="btn-small" onClick={handleSelect}>
        {selectedExercises.includes(exercise) ? "Remove" : "Add"}
      </button>
    </div>
  );
}

export default ExerciseCard;
