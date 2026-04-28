import Button from "./Button";

export function ExerciseCard({ exercise }) {
  return (
    <div className="container">
      <h3>{exercise.name}</h3>
      <p>{exercise.muscleGroup}</p>
      <Button>Add to Workout</Button>
    </div>
  );
}
