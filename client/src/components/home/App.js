import React, { useState, useEffect } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { UserContext } from "../users/UserContext";
import { ExerciseContext } from "../exercises/ExerciseContext";
import { RoutineContext } from "../routines/RoutineContext";
import { WorkoutContext } from "../workouts/WorkoutContext";
import Header from "./Header";
import Landing from "./Landing";
import LoginPage from "../users/LoginPage";
import SignUp from "../users/SignUp";
import Exercises from "../exercises/Exercises";
import Routines from "../routines/Routines";
import RoutinePage from "../routines/RoutinePage";
import NewWorkout from "../workouts/NewWorkout";
import WorkoutProgress from "../workouts/WorkoutProgress";
import Profile from "../users/Profile";
import "../../App.css";

function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [routines, setRoutines] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [exerciseSets, setExerciseSets] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [userSets, setUserSets] = useState([]);
  const [userReps, setUserReps] = useState([]);
  const [userWorkouts, setUserWorkouts] = useState([]);
  const [userSweats, setUserSweats] = useState([]);

  const routinesAPI = "/routines";
  const exercisesAPI = "/exercises";
  const exerciseSetsAPI = "/exercise_sets";

  useEffect(() => {
    fetch(routinesAPI)
      .then((response) => response.json())
      .then((routines) => setRoutines(routines));
  }, []);

  useEffect(() => {
    fetch(exercisesAPI)
      .then((response) => response.json())
      .then((exercises) => setExercises(exercises));
  }, []);

  useEffect(() => {
    fetch(exerciseSetsAPI)
      .then((response) => response.json())
      .then((exercise_sets) => setExerciseSets(exercise_sets));
  }, []);

  useEffect(() => {
    fetch("/me")
      .then((response) => {
        if (response.ok) {
          response.json().then((user) => {
            console.log(user);
            setUser(user);
            setUserWorkouts(user.workouts);
            setFavorites(user.favorites);
            setUserSweats(user.sweats);
            setIsLoggedIn(true);
          });
        } else {
          setUser(null);
          setIsLoggedIn(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setIsLoggedIn, setUser]);
  console.log("user workouts", userWorkouts);

  return (
    <ExerciseContext.Provider
      value={{
        exercises,
        setExercises,
        exerciseSets,
        setExerciseSets,
        selectedExercises,
        setSelectedExercises,
      }}
    >
      <UserContext.Provider
        value={{ user, setUser, isLoggedIn, setIsLoggedIn }}
      >
        <RoutineContext.Provider
          value={{ routines, setRoutines, favorites, setFavorites }}
        >
          <WorkoutContext.Provider
            value={{
              userSets,
              setUserSets,
              userReps,
              setUserReps,
              userWorkouts,
              setUserWorkouts,
              userSweats,
              setUserSweats,
            }}
          >
            <div className="App">
              <Header />
              <Routes>
                <Route path="/routines" element={<Routines />} />
                <Route path="/routines/:id" element={<RoutinePage />} />
                <Route path="/exercises" element={<Exercises />} />
                <Route
                  path="/workout-progress/:workoutId"
                  element={<WorkoutProgress />}
                />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/profile" element={<Profile />} />
                <Route
                  path="/new-workout/:routineId"
                  element={<NewWorkout />}
                />
                <Route exact path="/" element={<Landing />} />
              </Routes>
            </div>
          </WorkoutContext.Provider>
        </RoutineContext.Provider>
      </UserContext.Provider>
    </ExerciseContext.Provider>
  );
}

export default App;
