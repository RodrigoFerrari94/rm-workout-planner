import { useEffect, useState } from "react";
import { ExerciseCard } from "../components/ExerciseCard";
import { trainingGoals } from "../data/trainingGoals";

export default function WorkoutBuilder() {
  const [goal, setGoal] = useState("");
  const [exercisesList, setExercisesList] = useState([]);
  const [currentWorkout, setCurrentWorkout] = useState([]);

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

  const selectedGoalRules = trainingGoals[goal];

  function handleAddExerciseToWorkout(exercise) {
    if (!goal) {
      return alert("Please select a training goal first");
    }

    const alreadyAdded = currentWorkout.some(
      (workoutExercise) =>
        workoutExercise.exerciseId === exercise.exerciseId &&
        workoutExercise.goal === goal,
    );

    if (alreadyAdded) {
      return alert("This exercise is already added with this training goal.");
    }

    const workoutExercise = {
      exerciseId: exercise.exerciseId,
      exerciseName: exercise.exerciseName,
      muscleGroup: exercise.muscleGroup,
      estimated1RM: exercise.estimated1RM,
      maxLoad: Math.round(
        exercise.estimated1RM * selectedGoalRules.maxPercentage,
      ),
      minLoad: Math.round(
        exercise.estimated1RM * selectedGoalRules.minPercentage,
      ),
      sets: selectedGoalRules.sets,
      reps: selectedGoalRules.reps,
      rest: selectedGoalRules.rest,
      goal: goal,
    };

    setCurrentWorkout((prevWorkout) => [...prevWorkout, workoutExercise]);
  }

  function handleRemoveExerciseFromWorkout(indexToRemove) {
    setCurrentWorkout((prevWorkout) =>
      prevWorkout.filter((exercise, index) => index !== indexToRemove),
    );
  }

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
          <ExerciseCard
            key={exercise.exerciseId}
            exercise={exercise}
            onAddExercise={handleAddExerciseToWorkout}
          />
        ))}
      </div>

      <div className="container">
        <h2>Current Workout</h2>
        {currentWorkout &&
          currentWorkout.map((selectedExercise, index) => (
            <div className="container" key={index}>
              <h3>{selectedExercise.exerciseName}</h3>
              <h4>{selectedExercise.muscleGroup}</h4>
              <p>Sets: {selectedExercise.sets}</p>
              <p>Reps: {selectedExercise.reps}</p>
              <p>Rest: {selectedExercise.rest}</p>
              <p>
                Load range: {selectedExercise.minLoad} kg -{" "}
                {selectedExercise.maxLoad} kg
              </p>
              <button onClick={() => handleRemoveExerciseFromWorkout(index)}>
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
