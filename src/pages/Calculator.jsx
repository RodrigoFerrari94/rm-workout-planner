import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Calculator() {
  const [exercise, setExercise] = useState("");
  const [exerciseWeight, setExerciseWeight] = useState("");
  const [reps, setReps] = useState("");
  const [calculatedExercise, setCalculatedExercise] = useState(null);

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
    </div>
  );
}
