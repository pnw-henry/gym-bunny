import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RoutineContext } from "../routines/RoutineContext";
import { UserContext } from "../users/UserContext";
import { WorkoutContext } from "./WorkoutContext";

function NewWorkout() {
  const { routineId } = useParams();
  const { routines } = useContext(RoutineContext);
  const { user } = useContext(UserContext);
  const {
    userSets,
    setUserSets,
    userReps,
    setUserReps,
    userWorkouts,
    setUserWorkouts,
  } = useContext(WorkoutContext);
  const navigate = useNavigate();
  const [savedExercises, setSavedExercises] = useState([]);
  const [sweatData, setSweatData] = useState({});

  const routine = routines.find((routine) => routine.id === Number(routineId));
  if (!routine) {
    return <div>Loading...</div>;
  }

  const handleSetNumberChange = (exerciseId, value) => {
    setUserSets((prev) => ({
      ...prev,
      [exerciseId]: value,
    }));
  };

  const handleRepsNumberChange = (exerciseId, value) => {
    setUserReps((prev) => ({
      ...prev,
      [exerciseId]: value,
    }));
  };

  const handleSaveValues = (exerciseId, recommendedSets, recommendedReps) => {
    const userSetsValue = userSets[exerciseId];
    const userRepsValue = userReps[exerciseId];

    const shouldShowSetInput =
      userSetsValue !== recommendedSets && userSetsValue !== undefined;
    const shouldShowRepInput =
      userRepsValue !== recommendedReps && userRepsValue !== undefined;

    setUserSets((prev) => ({
      ...prev,
      [exerciseId]: shouldShowSetInput ? userSetsValue : recommendedSets,
    }));

    setUserReps((prev) => ({
      ...prev,
      [exerciseId]: shouldShowRepInput ? userRepsValue : recommendedReps,
    }));
    setSavedExercises((prev) => [...prev, exerciseId]);

    const newSweatData = {
      ...sweatData,
      weight: 0,
      sets: shouldShowSetInput ? userSetsValue : recommendedSets,
      reps: shouldShowRepInput ? userRepsValue : recommendedReps,
      exercise_id: exerciseId,
      routine_id: routine.id,
      user_id: user.id,
    };
    fetch("/sweats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSweatData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("post to sweats success:", data);
        setSweatData(data);
      })
      .catch((error) => {
        console.error("post to sweats error:", error);
      });
  };

  const handleResetValues = () => {
    setUserSets([]);
    setUserReps([]);
    setSavedExercises([]);
  };

  const handleBeginWorkout = async () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];

    const response = await fetch("/workouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        routine_id: routine.id,
        user_id: user.id,
        date: formattedDate,
        duration: 0,
        calories_burned: 0,
      }),
    });
    const newWorkout = await response.json();
    console.log("post to workouts success:", newWorkout);
    setUserWorkouts([...userWorkouts, newWorkout]);
    navigate(`/workout-progress/${newWorkout.id}`);
  };

  const allExercisesSaved = savedExercises.length === routine.exercises.length;

  return (
    <div>
      <h2>{routine.name}</h2>
      {routine.exercises.map((exercise) => {
        const { id, name } = exercise;
        const exercise_sets = routine.exercise_sets.find((set) => {
          return set.exercise_id === id;
        });
        const recommendedSets = exercise_sets.set_number;
        const recommendedReps = exercise_sets.reps;

        const userSetsValue =
          userSets[id] !== undefined ? userSets[id] : recommendedSets;
        const userRepsValue =
          userReps[id] !== undefined ? userReps[id] : recommendedReps;

        const shouldShowSetInput = userSetsValue !== recommendedSets;
        const shouldShowRepInput = userRepsValue !== recommendedReps;

        const isSaved = savedExercises.includes(id);

        return (
          <div key={id}>
            <h3>{name}</h3>
            <p>
              {shouldShowSetInput
                ? `Custom Sets: ${userSetsValue}`
                : `Recommended Sets: ${recommendedSets}`}
            </p>
            <p>
              {shouldShowRepInput
                ? `Custom Reps: ${userRepsValue}`
                : `Recommended Reps: ${recommendedReps}`}
            </p>
            {!isSaved && (
              <>
                <label>
                  Change Set?
                  <input
                    type="checkbox"
                    checked={shouldShowSetInput}
                    onChange={(event) => {
                      if (event.target.checked) {
                        handleSetNumberChange(id, "");
                      } else {
                        handleSetNumberChange(id, recommendedSets);
                      }
                    }}
                  />
                </label>
                <label>
                  Change Reps?
                  <input
                    type="checkbox"
                    checked={shouldShowRepInput}
                    onChange={(event) => {
                      if (event.target.checked) {
                        handleRepsNumberChange(id, "");
                      } else {
                        handleRepsNumberChange(id, recommendedReps);
                      }
                    }}
                  />
                </label>
                {shouldShowSetInput && (
                  <input
                    type="number"
                    value={userSetsValue}
                    onChange={(event) => {
                      handleSetNumberChange(id, event.target.value);
                    }}
                  />
                )}
                {shouldShowRepInput && (
                  <input
                    type="number"
                    value={userRepsValue}
                    onChange={(event) => {
                      handleRepsNumberChange(id, event.target.value);
                    }}
                  />
                )}
                <button
                  onClick={() =>
                    handleSaveValues(id, recommendedSets, recommendedReps)
                  }
                >
                  Save
                </button>
              </>
            )}
          </div>
        );
      })}
      {allExercisesSaved && (
        <>
          <button onClick={handleBeginWorkout}>Begin Workout</button>
          <button onClick={handleResetValues}>Reset</button>
        </>
      )}
    </div>
  );
}

export default NewWorkout;
