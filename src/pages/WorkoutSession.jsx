import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TimerToRest from "../components/TimerToRest";
import Button from "../components/Button";

export default function WorkoutSession() {
  const [sessionExercises, setSessionExercises] = useState([]);

  const CURRENT_WORKOUT_STORAGE_KEY = "currentWorkout";

  const navigate = useNavigate();

  useEffect(() => {
    const savedWorkout = localStorage.getItem(CURRENT_WORKOUT_STORAGE_KEY);

    if (savedWorkout) {
      const parsedWorkout = JSON.parse(savedWorkout);

      const exercisesWithProgress = parsedWorkout.map((exercise) => {
        return { ...exercise, completedSets: 0, isFinished: false };
      });

      setSessionExercises(exercisesWithProgress);
    }
  }, []);

  function handleCompleteSet(exerciseIndex) {
    setSessionExercises((prevExercises) => {
      const updatedExercises = prevExercises.map((exercise, index) => {
        if (index !== exerciseIndex) {
          return exercise;
        }
        const updatedExercise = {
          ...exercise,

          completedSets: exercise.completedSets + 1,
        };
        return updatedExercise;
      });

      return updatedExercises;
    });
  }

  function handleFinishExercise(exerciseIndex) {
    setSessionExercises((prevExercises) => {
      const updatedExercises = prevExercises.map((exercise, index) => {
        if (index !== exerciseIndex) {
          return exercise;
        }
        const updatedExercise = {
          ...exercise,
          isFinished: true,
        };
        return updatedExercise;
      });

      return updatedExercises;
    });
  }

  function handleRestartExercise(exerciseIndex) {
    const keepProgress = confirm(
      "Keep previous progress? Press OK to keep it, or Cancel to reset.",
    );

    setSessionExercises((prevExercises) => {
      const updatedExercises = prevExercises.map((exercise, index) => {
        if (index !== exerciseIndex) {
          return exercise;
        }

        if (keepProgress) {
          const updatedExercise = {
            ...exercise,
            isFinished: false,
          };
          return updatedExercise;
        }

        const updatedExercise = {
          ...exercise,
          isFinished: false,
          completedSets: 0,
        };

        return updatedExercise;
      });
      return updatedExercises;
    });
  }

  return (
    <div className="container">
      <h1>Workout Session</h1>
      {sessionExercises.map((exercise, index) => (
        <div className="container" key={index}>
          <h3>{exercise.exerciseName}</h3>
          <p>
            Load range: {exercise.minLoad} kg - {exercise.maxLoad} kg
          </p>
          <p>Suggested Sets: {exercise.sets}</p>
          <p>Reps: {exercise.reps}</p>
          <p>Rest: {exercise.rest}s</p>
          {!exercise.isFinished && (
            <TimerToRest
              initialSeconds={exercise.rest}
              onCompleteSet={() => handleCompleteSet(index)}
            />
          )}
          <p>Completed Sets: {exercise.completedSets}</p>
          <p>Status: {exercise.isFinished ? "Finished" : "In Progress"}</p>
          {!exercise.isFinished ? (
            <Button onClick={() => handleFinishExercise(index)}>
              Finish Exercise
            </Button>
          ) : (
            <Button onClick={() => handleRestartExercise(index)}>
              Restart Exercise
            </Button>
          )}
        </div>
      ))}
      <Button onClick={() => navigate("/workout-builder")}>
        Back to Workout Builder
      </Button>
    </div>
  );
}
