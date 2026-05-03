import Button from "./Button";

export function ExerciseCard({ exercise }) {
  return (
    <div className="container">
      <h3>{exercise.exerciseName}</h3>
      <p>{exercise.muscleGroup}</p>
      <p>Estimated 1RM: {exercise.estimated1RM}</p>
      <Button>Add to Workout</Button>
    </div>
  );
}
