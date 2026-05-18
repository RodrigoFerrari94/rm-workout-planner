import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Timer from "../components/Timer";

export default function WorkoutSession() {
  const [currentWorkout, setCurrentWorkout] = useState([]);

  const CURRENT_WORKOUT_STORAGE_KEY = "currentWorkout";

  const navigate = useNavigate();

  useEffect(() => {
    const savedWorkout = localStorage.getItem(CURRENT_WORKOUT_STORAGE_KEY);

    if (savedWorkout) {
      const parsedWorkout = JSON.parse(savedWorkout);
      setCurrentWorkout(parsedWorkout);
    }
  }, []);

  return (
    <div className="container">
      <h1>Workout Session</h1>
      {currentWorkout.map((exercise, index) => (
        <div className="container" key={index}>
          <h3>{exercise.exerciseName}</h3>
          <p>
            Load range: {exercise.minLoad} kg - {exercise.maxLoad} kg
          </p>
          <p>Sets: {exercise.sets}</p>
          <p>Reps: {exercise.reps}</p>
          <p>Rest: {exercise.rest}s</p>
          <Timer initialSeconds={exercise.rest} />
        </div>
      ))}
      <button onClick={() => navigate("/workout-builder")}>
        Back to Workout Builder
      </button>
    </div>
  );
}
