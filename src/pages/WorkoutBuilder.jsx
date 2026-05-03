import { useEffect, useState } from "react";
import { ExerciseCard } from "../components/ExerciseCard";

export default function WorkoutBuilder() {
  const [goal, setGoal] = useState("");
  const [exercisesList, setExercisesList] = useState([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem("history");

    if (savedHistory) {
      const parsedHistory = JSON.parse(savedHistory);

      // Keep only the latest 1RM calculation for each exercise
      const latestExercises = [];

      parsedHistory.forEach((item) => {
        const existingIndex = latestExercises.findIndex(
          (exercise) => exercise.exerciseId === item.exerciseId,
        );

        if (existingIndex === -1) {
          latestExercises.push(item);
        } else {
          latestExercises[existingIndex] = item;
        }
      });

      setExercisesList(latestExercises);
    }
  }, []);

  return (
    <div className="container">
      <h1>Workout Builder</h1>
      <label>Select a training goal</label>
      <select value={goal} onChange={(e) => setGoal(e.target.value)}>
        <option value="" disabled>
          Select a goal
        </option>
        <option value="strength">Strength</option>
        <option value="hypertrophy">Hypertrophy</option>
        <option value="endurance">Endurance</option>
      </select>
      <div className="container">
        <h2>Calculated Exercises</h2>
        {exercisesList.map((exercise) => (
          <ExerciseCard key={exercise.exerciseId} exercise={exercise} />
        ))}
      </div>
    </div>
  );
}
