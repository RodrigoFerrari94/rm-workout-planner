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
      createdAt: Date.now(),
    };

    setHistory((prev) => {
      const updatedHistory = [newHistoryItem, ...prev].slice(0, HISTORY_LIMIT);

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
    <div className="page calculator-page">
      <header className="calculator-page__header">
        <h1 className="calculator-page__title">Calculate 1RM</h1>
        <p className="calculator-page__subtitle">
          Enter the weight and repetitions you performed.
        </p>
      </header>

      <main className="page__content calculator-page__content">
        <section className="card calculator-page__input-card">
          <form className="calculator-page__form" onSubmit={handleCalculate}>
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
              label="Weight (kg)"
              type="number"
              placeholder="0 kg"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />

            <Input
              label="Repetitions"
              type="number"
              placeholder="0"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
            />

            <Button type="submit">Calculate 1RM</Button>
          </form>
        </section>

        {calculation && (
          <section className="card calculator-page__result-card">
            <span className="calculator-page__result-label">
              Your estimated 1RM
            </span>

            <strong className="calculator-page__result-value">
              {calculation.estimated1RM} kg
            </strong>

            <p className="calculator-page__result-meta">
              Based on {calculation.weight} kg x {calculation.reps} reps
            </p>

            <p className="calculator-page__formula">Formula: Epley</p>
          </section>
        )}

        {history.length > 0 && (
          <section className="calculator-page__history">
            <div className="calculator-page__section-header">
              <h2>Recent History</h2>
              <Button onClick={handleClearHistory} className="button--danger">
                Clear
              </Button>
            </div>

            <div className="calculator-page__history-list">
              {history.map((item) => (
                <HistoryItem key={item.id} item={item} />
              ))}
            </div>

            <NavigationButton to="/workout-builder">
              Go to Workout Builder
            </NavigationButton>
          </section>
        )}
      </main>
    </div>
  );
}
