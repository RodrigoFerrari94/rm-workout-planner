import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TimerToRest from "../components/TimerToRest";
import Button from "../components/Button";
import NavigationButton from "../components/NavigationButton";

export default function WorkoutSession() {
  const [sessionExercises, setSessionExercises] = useState([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const navigate = useNavigate();

  const CURRENT_WORKOUT_STORAGE_KEY = "currentWorkout";
  const COMPLETED_WORKOUTS_STORAGE_KEY = "completedWorkouts";

  const currentExercise = sessionExercises[currentExerciseIndex];
  const lastExerciseIndex = sessionExercises.length - 1;
  const totalExercises = sessionExercises.length;

  const allExercisesFinished =
    totalExercises > 0 &&
    sessionExercises.every((exercise) => exercise.isFinished === true);

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

      const exerciseInProgressIndex = updatedExercises.findIndex(
        (exercise) => exercise.isFinished === false,
      );
      if (exerciseInProgressIndex === -1) {
        setCurrentExerciseIndex(updatedExercises.length - 1);
      } else {
        setCurrentExerciseIndex(exerciseInProgressIndex);
      }

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

  function handleNextExercise() {
    if (currentExerciseIndex < lastExerciseIndex) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }
  }

  function handlePreviousExercise() {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
    }
  }

  function handleFinishWorkout() {
    const completedWorkout = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      exercises: sessionExercises,
      totalExercises: totalExercises,
    };

    const savedCompletedWorkouts =
      localStorage.getItem(COMPLETED_WORKOUTS_STORAGE_KEY) || null;

    const previousCompletedWorkouts = savedCompletedWorkouts
      ? JSON.parse(savedCompletedWorkouts)
      : [];

    const updatedCompletedWorkouts = [
      ...previousCompletedWorkouts,
      completedWorkout,
    ];

    localStorage.setItem(
      COMPLETED_WORKOUTS_STORAGE_KEY,
      JSON.stringify(updatedCompletedWorkouts),
    );

    localStorage.removeItem(CURRENT_WORKOUT_STORAGE_KEY);

    alert("Great job! Your workout has been completed and saved successfully.");

    navigate("/calculator");
  }

  function handleRestartWorkout() {
    const confirmRestart = confirm(
      "Restart the entire workout? This will reset all completed sets.",
    );

    if (confirmRestart) {
      setSessionExercises((prevExercises) => {
        const restartedExercises = prevExercises.map((exercise) => {
          const restartedExercise = {
            ...exercise,
            completedSets: 0,
            isFinished: false,
          };
          return restartedExercise;
        });

        return restartedExercises;
      });
      setCurrentExerciseIndex(0);
    }
  }

  return (
    <div>
      <div className="container">
        <h1>Workout Session</h1>
        {sessionExercises.length === 0 ? (
          <div className="container">
            <p> No workout found.</p>
            <p>Build a workout first before starting a session.</p>
          </div>
        ) : (
          <div className="container">
            <p>
              Exercise {currentExerciseIndex + 1} of {totalExercises}
            </p>
            <h3>{currentExercise.exerciseName}</h3>
            <p>
              Load range: {currentExercise.minLoad} kg -{" "}
              {currentExercise.maxLoad} kg
            </p>
            <p>Suggested Sets: {currentExercise.sets}</p>
            <p>Reps: {currentExercise.reps}</p>
            <p>Rest: {currentExercise.rest}</p>
            {!currentExercise.isFinished && (
              <TimerToRest
                initialSeconds={currentExercise.restTimerSeconds}
                onCompleteSet={() => handleCompleteSet(currentExerciseIndex)}
              />
            )}
            <p>Completed Sets: {currentExercise.completedSets}</p>
            <p>
              Status: {currentExercise.isFinished ? "Finished" : "In Progress"}
            </p>
            {!currentExercise.isFinished ? (
              <Button
                onClick={() => handleFinishExercise(currentExerciseIndex)}
              >
                Finish Exercise
              </Button>
            ) : (
              <Button
                onClick={() => handleRestartExercise(currentExerciseIndex)}
              >
                Restart Exercise
              </Button>
            )}

            <div>
              {" "}
              {currentExerciseIndex > 0 && (
                <Button onClick={handlePreviousExercise}>Prev</Button>
              )}{" "}
              {currentExerciseIndex < lastExerciseIndex && (
                <Button onClick={handleNextExercise}>Next</Button>
              )}
            </div>
          </div>
        )}
        {allExercisesFinished && (
          <div>
            <Button onClick={handleFinishWorkout}>Finish Workout</Button>{" "}
            <Button onClick={handleRestartWorkout}>Restart Workout</Button>{" "}
          </div>
        )}
      </div>

      <NavigationButton to="/workout-builder">
        Back to Workout Builder
      </NavigationButton>
    </div>
  );
}
