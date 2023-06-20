import React, { useState, useContext, useEffect } from "react";
import { WorkoutContext } from "./WorkoutContext";
import { UserContext } from "../users/UserContext";
import { RoutineContext } from "../routines/RoutineContext";
import { useParams, useNavigate } from "react-router-dom";

function WorkoutProgress() {
  const { workoutId } = useParams();
  const { user } = useContext(UserContext);
  const { routines } = useContext(RoutineContext);
  const { userWorkouts, setUserWorkouts, userSweats, setUserSweats } =
    useContext(WorkoutContext);
  const [workout, setWorkout] = useState([]);
  const [routine, setRoutine] = useState([]);
  const [routineSweats, setRoutineSweats] = useState([]);
  const [duration, setDuration] = useState([]);
  const [calories, setCalories] = useState([]);
  const [notes, setNotes] = useState("");
  const [isPlaceHolderVisible, setIsPlacedHolderVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const workout = userWorkouts.find(
      (workout) => workout.id === Number(workoutId)
    );
    if (workout) {
      const routine = routines.find(
        (routine) => routine.id === workout.routine_id
      );
      if (routine) {
        const filteredSweats = routine.exercises.reduce(
          (accumulator, exercise) => {
            const exerciseSweats = user.sweats.filter(
              (sweat) =>
                sweat.routine_id === routine.id &&
                sweat.exercise_id === exercise.id
            );
            if (exerciseSweats.length > 0) {
              exerciseSweats.sort(
                (a, b) => new Date(a.created_at) - new Date(b.created_at)
              );
              accumulator.push(exerciseSweats[0]);
            }
            return accumulator;
          },
          []
        );
        setRoutineSweats(filteredSweats);
        setWorkout(workout);
        setRoutine(routine);
      }
    }
  }, [workoutId, user, userWorkouts, routines]);

  const handleRepsChange = (index, value, predefinedWeight, predefinedSets) => {
    const updatedSweats = [...routineSweats];
    const exercise = routine.exercises[index];
    const sweat = updatedSweats.find(
      (sweat) => sweat && sweat.exercise_id === exercise.id
    );
    if (sweat) {
      sweat.reps = parseInt(value, 10);
      setRoutineSweats(updatedSweats);
    } else {
      const newSweat = {
        exercise_id: exercise.id,
        routine_id: routine.id,
        workout_id: workout.id,
        user_id: user.id,
        reps: parseInt(value, 10),
        sets: predefinedSets,
        weight: predefinedWeight,
      };
      updatedSweats.push(newSweat);
      setRoutineSweats(updatedSweats);
    }
  };

  const handleSetsChange = (index, value, predefinedReps, predefinedWeight) => {
    const updatedSweats = [...routineSweats];
    const exercise = routine.exercises[index];
    const sweat = updatedSweats.find(
      (sweat) => sweat && sweat.exercise_id === exercise.id
    );
    if (sweat) {
      sweat.sets = parseInt(value, 10);
      setRoutineSweats(updatedSweats);
    } else {
      const newSweat = {
        exercise_id: exercise.id,
        routine_id: routine.id,
        workout_id: workout.id,
        user_id: user.id,
        reps: predefinedReps,
        sets: parseInt(value, 10),
        weight: predefinedWeight,
      };
      updatedSweats.push(newSweat);
      setRoutineSweats(updatedSweats);
    }
  };

  const handleWeightChange = (index, value, predefinedReps, predefinedSets) => {
    const updatedSweats = [...routineSweats];
    const exercise = routine.exercises[index];
    const sweat = updatedSweats.find(
      (sweat) => sweat && sweat.exercise_id === exercise.id
    );
    if (sweat) {
      sweat.weight = parseFloat(value);
      setRoutineSweats(updatedSweats);
    } else {
      const newSweat = {
        exercise_id: exercise.id,
        routine_id: routine.id,
        workout_id: workout.id,
        user_id: user.id,
        reps: predefinedReps,
        sets: predefinedSets,
        weight: parseFloat(value),
      };
      updatedSweats.push(newSweat);
      setRoutineSweats(updatedSweats);
    }
  };

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
    setIsPlacedHolderVisible(false);
  };

  const handleSubmit = (event) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
    event.preventDefault();
    const sweatData = routineSweats.map((sweat) => {
      return {
        ...sweat,
      };
    });
    sweatData.forEach((sweat) => {
      fetch("/sweats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sweat),
      })
        .then((response) => response.json())
        .then((sweat) => {
          console.log("Sweat Post Success:", sweat);
          setUserSweats([...userSweats, sweat]);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
    const workoutData = {
      ...workout,
      duration: duration,
      calories_burned: calories,
      date: formattedDate,
      notes: notes,
    };
    fetch(`/workouts/${workout.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workoutData),
    })
      .then((response) => response.json())
      .then((workout) => {
        console.log("Workout Patch Success:", workout);
        setUserWorkouts([...userWorkouts, workout]);
        navigate("/profile");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  if (workout.length === 0 || routine.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <main className="workout-progress">
      <h2>Workout Progress: {routine.name}</h2>
      <div className="exercise-list">
        {routine.exercises.map((exercise, index) => {
          const sweat = routineSweats.find(
            (sweat) => sweat && sweat.exercise_id === exercise.id
          );
          const predefinedSets = routine.exercise_sets.find(
            (set) => set.exercise_id === exercise.id
          );
          const predefinedReps = predefinedSets ? predefinedSets.reps : "";
          const predefinedSetsNumber = predefinedSets
            ? predefinedSets.set_number
            : "";
          const predefinedWeight = 0;
          return (
            <div key={exercise.id} className="exercise-item">
              <img
                src={exercise.exercise_photo}
                alt={`Image of ${exercise.name}`}
              />

              <div className="exercise-card-details">
                <h3>{exercise.name}</h3>

                <div className="exercise-form">
                  <div className="exercise-form-field">
                    <input
                      id={`sets${index}`}
                      name={`sets${index}`}
                      value={sweat ? sweat.sets : predefinedSetsNumber}
                      onChange={(e) =>
                        handleSetsChange(
                          index,
                          e.target.value,
                          predefinedReps,
                          predefinedWeight
                        )
                      }
                    />
                    <label htmlFor={`sets${index}`}>Sets</label>
                  </div>
                  <p>x</p>
                  <div className="exercise-form-field">
                    <input
                      id={`reps${index}`}
                      name={`reps${index}`}
                      value={sweat ? sweat.reps : predefinedReps}
                      onChange={(e) =>
                        handleRepsChange(
                          index,
                          e.target.value,
                          predefinedWeight,
                          predefinedSetsNumber
                        )
                      }
                    />
                    <label htmlFor={`reps${index}`}>Reps</label>
                  </div>
                  <p>@</p>
                  <div className="exercise-form-field">
                    <input
                      id={`weight${index}`}
                      name={`weight${index}`}
                      value={sweat ? sweat.weight : predefinedWeight}
                      onChange={(e) =>
                        handleWeightChange(
                          index,
                          e.target.value,
                          predefinedReps,
                          predefinedSetsNumber
                        )
                      }
                    />

                    <label htmlFor={`weight${index}`}>Weight</label>
                  </div>
                  <p>lbs</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="workout-form">
        <label htmlFor="duration">Duration (minutes):</label>
        <input
          type="number"
          id="duration"
          name="duration"
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value))}
        />
        <label htmlFor="calories">Calories Burned:</label>
        <input
          type="number"
          id="calories"
          name="calories"
          value={calories}
          onChange={(e) => setCalories(parseInt(e.target.value))}
        />
        <label htmlFor="notes">Notes:</label>
        <textarea
          id="notes"
          name="notes"
          placeholder={isPlaceHolderVisible ? "Add notes here..." : null}
          value={notes}
          onChange={handleNotesChange}
        />
      </div>
      <div className="workout-progress-buttons">
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </main>
  );
}

export default WorkoutProgress;
