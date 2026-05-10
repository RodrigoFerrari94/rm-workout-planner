import Button from "./Button";

export function ExerciseCard({ exercise, onAddExercise }) {
  return (
    <div className="container">
      <h3>{exercise.exerciseName}</h3>
      <p>{exercise.muscleGroup}</p>
      <p>Estimated 1RM: {exercise.estimated1RM}</p>
      <Button onClick={() => onAddExercise(exercise)}>Add to Workout</Button>
    </div>
  );
}
