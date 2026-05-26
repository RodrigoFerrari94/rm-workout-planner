import { useEffect, useState } from "react";

import Input from "../components/Input";
import Button from "../components/Button";
import Select from "../components/Select.jsx";
import NavigationButton from "../components/NavigationButton.jsx";
import HistoryItem from "../components/HistoryItem";
import { calculate1RM } from "../utils/calculate1RM";
import { exercises } from "../data/exercises.js";

export default function Calculator() {
  const [exerciseId, setExerciseId] = useState("");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [calculation, setCalculation] = useState(null);

  const [history, setHistory] = useState([]);

  function handleCalculate(e) {
    e.preventDefault();
    if (!exerciseId) {
      alert("Please select an exercise to calculate");
      return;
    }

    if (!weight) {
      alert("Please enter with exercise weight to calculate");
      return;
    }

    if (!reps) {
      alert("Please enter with number of reps to calculate");
      return;
    }
    const selectedExercise = exercises.find(
      (exercise) => exercise.id === exerciseId,
    );

    if (!selectedExercise) {
      alert("Selected exercise was not found");
      return;
    }

    const estimated1RM = calculate1RM(weight, reps);

    setCalculation({
      exerciseName: selectedExercise.name,
      muscleGroup: selectedExercise.muscleGroup,
      weight,
      reps,
      estimated1RM,
    });

    const HISTORY_LIMIT = 10;
    const newHistoryItem = {
      id: Date.now(),
      exerciseId: selectedExercise.id,
      exerciseName: selectedExercise.name,
      muscleGroup: selectedExercise.muscleGroup,
      weight: weight,
      reps: reps,
      estimated1RM: estimated1RM,
      date: new Date().toLocaleDateString(),
    };

    setHistory((prev) => {
      const updatedHistory = [...prev, newHistoryItem].slice(-HISTORY_LIMIT);

      localStorage.setItem("history", JSON.stringify(updatedHistory));

      return updatedHistory;
    });

    setExerciseId("");
    setWeight("");
    setReps("");
  }

  function handleClearHistory() {
    const confirmedClear = confirm(
      "This will clear your calculation history and current workout. Continue?",
    );

    if (confirmedClear) {
      setHistory([]);
      setCalculation(null);
      localStorage.removeItem("history");
      localStorage.removeItem("currentWorkout");
    }
  }

  useEffect(() => {
    const savedHistory = localStorage.getItem("history");

    if (savedHistory) {
      const parsedHistory = JSON.parse(savedHistory);

      setHistory(parsedHistory);
    }
  }, []);

  return (
    <div className="container">
      <h1>1RM Calculator</h1>
      <form onSubmit={handleCalculate}>
        <Select
          label="Exercise"
          value={exerciseId}
          onChange={(e) => setExerciseId(e.target.value)}
        >
          <option value="" disabled>
            Select an exercise
          </option>

          {exercises.map((exercise) => (
            <option key={exercise.id} value={exercise.id}>
              {exercise.name}
            </option>
          ))}
        </Select>

        <Input
          label={"Weight"}
          type={"number"}
          placeholder={"Enter the weight used"}
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />

        <Input
          label={"Reps"}
          type={"number"}
          placeholder={"Enter the number of reps"}
          value={reps}
          onChange={(e) => setReps(e.target.value)}
        />

        <Button type={"submit"}>Calculate</Button>
      </form>

      {calculation && (
        <p>
          Your 1RM is {calculation.estimated1RM}Kg for{" "}
          {calculation.exerciseName}.
        </p>
      )}
      {history.length > 0 && (
        <NavigationButton to={"/workout-builder"}>
          Go to Workout Builder
        </NavigationButton>
      )}

      {history.length > 0 && (
        <div>
          <h2>Historical</h2>
          <Button onClick={handleClearHistory}>Clear History</Button>
        </div>
      )}

      {history.map((item) => (
        <HistoryItem key={item.id} item={item} />
      ))}
    </div>
  );
}
