import { useState } from "react";
import { useEffect } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import HistoryItem from "../components/historyItem";
import { calculate1RM } from "../utils/calculate1RM";

export default function Calculator() {
  const [exercise, setExercise] = useState("");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [calculation, setCalculation] = useState(null);

  const [history, setHistory] = useState([]);

  function handleCalculate(e) {
    e.preventDefault();
    if (!exercise) {
      alert("Please enter with exercise name to calculate");
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

    const result = calculate1RM(weight, reps);

    setCalculation({
      exercise,
      weight,
      reps,
      result,
    });

    const HISTORY_LIMIT = 10;
    const newHistoryItem = {
      id: Date.now(),
      exercise: exercise,
      weight: weight,
      reps: reps,
      result: result,
      date: new Date().toLocaleDateString(),
    };

    setHistory((prev) => {
      const updatedHistory = [...prev, newHistoryItem].slice(-HISTORY_LIMIT);

      localStorage.setItem("history", JSON.stringify(updatedHistory));

      return updatedHistory;
    });

    setExercise("");
    setWeight("");
    setReps("");
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
        <Input
          label={"Exercise"}
          type={"text"}
          placeholder={"Enter the exercise name"}
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
        />

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
          Your 1RM is {calculation.result} for{" "}
          {calculation.exercise}.
        </p>
      )}

      {history.length > 0 && <h2>Historical</h2>}
      {history.map((item) => (
        <HistoryItem key={item.id} item={item} />
      ))}
    </div>
  );
}
