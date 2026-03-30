import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Calculator() {
  const [exercise, setExercise] = useState("");
  const [exerciseWeight, setExerciseWeight] = useState("");
  const [reps, setReps] = useState("");
  const [calculatedExercise, setCalculatedExercise] = useState(null);

  const [history, setHistory] = useState([]);

  function handleDataToCalculate(e) {
    e.preventDefault();
    if (!exercise) {
      alert("Please enter with exercise name to calculate");
      return;
    }

    if (!exerciseWeight) {
      alert("Please enter with exercise weight to calculate");
      return;
    }

    if (!reps) {
      alert("Please enter with number of reps to calculate");
      return;
    }

    const result = Math.round(Number(exerciseWeight) * (1 + Number(reps) / 30));

    setCalculatedExercise({
      exercise,
      exerciseWeight,
      reps,
      result,
    });

    const limitHistory = 10;
    const newHistory = {
      id: Date.now(),
      exercise: exercise,
      weight: exerciseWeight,
      reps: reps,
      result: result,
      date: new Date().toLocaleDateString(),
    };

    setHistory((prev) => {
      const updatedHistory = [...prev, newHistory].slice(-limitHistory);

      localStorage.setItem("history", JSON.stringify(updatedHistory));

      return updatedHistory;
    });

    setExercise("");
    setExerciseWeight("");
    setReps("");
  }

  return (
    <div className="container">
      <h1>1RM Calculator</h1>
      <form onSubmit={handleDataToCalculate}>
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
          value={exerciseWeight}
          onChange={(e) => setExerciseWeight(e.target.value)}
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

      {calculatedExercise && (
        <p>
          Your 1RM is {calculatedExercise.result} for{" "}
          {calculatedExercise.exercise}.
        </p>
      )}

      {history.length > 0 && <h2>Historical</h2>}
      {history.map((data) => (
        <div className="container" key={data.id}>
          <p>Exercise: {data.exercise}</p>
          <p>Weight: {data.weight}Kg</p>
          <p>Reps: {data.reps}</p>
          <p>1 RM: {data.result}Kg</p>
          <p>Date: {data.date}</p>
          <p>------------------------------------</p>
        </div>
      ))}
    </div>
  );
}
