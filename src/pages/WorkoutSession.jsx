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

  const setsRange = currentExercise
    ? currentExercise.sets.split("-").map(Number)
    : [0, 0];

  const minSuggestedSets = setsRange[0];
  const maxSuggestedSets = setsRange[1] ?? setsRange[0];

  const isSetsBelowRange =
    currentExercise &&
    currentExercise.completedSets > 0 &&
    currentExercise.completedSets < minSuggestedSets;

  const isSetsAboveRange =
    currentExercise && currentExercise.completedSets > maxSuggestedSets;

  const isSetsWithinRange =
    currentExercise &&
    currentExercise.completedSets >= minSuggestedSets &&
    currentExercise.completedSets <= maxSuggestedSets;

  const setsStatusClass = isSetsWithinRange
    ? "workout-session-page__sets-count--success"
    : isSetsBelowRange || isSetsAboveRange
      ? "workout-session-page__sets-count--danger"
      : "";

  const setsFeedbackText = isSetsWithinRange
    ? "Within suggested range"
    : isSetsBelowRange
      ? "Below suggested range"
      : isSetsAboveRange
        ? "Above suggested range"
        : "Not started yet";

  const workoutProgress =
    totalExercises > 0
      ? ((currentExerciseIndex + 1) / totalExercises) * 100
      : 0;

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
    <div className="page workout-session-page">
      <header className="workout-session-page__header">
        <h1 className="workout-session-page__title">Workout Session</h1>

        {sessionExercises.length > 0 && (
          <p className="workout-session-page__subtitle">
            Exercise {currentExerciseIndex + 1} of {totalExercises}
          </p>
        )}
      </header>

      <main className="page__content workout-session-page__content">
        {sessionExercises.length === 0 ? (
          <section className="card workout-session-page__empty">
            <h2>No workout found</h2>
            <p>Build a workout first before starting a session.</p>

            <NavigationButton to="/workout-builder">
              Back to Workout Builder
            </NavigationButton>
          </section>
        ) : (
          <>
            <section className="card workout-session-page__exercise-card">
              <div className="workout-session-page__exercise-header">
                <div>
                  <div className="workout-session-page__exercise-title-row">
                    <h2>{currentExercise.exerciseName}</h2>

                    <span className="workout-session-page__goal-badge">
                      {currentExercise.goal}
                    </span>
                  </div>

                  <p>{currentExercise.muscleGroup}</p>
                </div>

                <span
                  className={`workout-session-page__status ${
                    currentExercise.isFinished
                      ? "workout-session-page__status--finished"
                      : "workout-session-page__status--active"
                  }`}
                >
                  {currentExercise.isFinished ? "Finished" : "In Progress"}
                </span>
              </div>

              <div className="workout-session-page__progress">
                <div
                  className="workout-session-page__progress-fill"
                  style={{ width: `${workoutProgress}%` }}
                />
              </div>

              <div className="workout-session-page__metrics">
                <div className="workout-session-page__metric-card">
                  <span className="workout-session-page__metric-label">
                    Load range
                  </span>
                  <strong className="workout-session-page__metric-value">
                    {currentExercise.minLoad} - {currentExercise.maxLoad} kg
                  </strong>
                </div>

                <div className="workout-session-page__metric-card">
                  <span className="workout-session-page__metric-label">
                    Reps
                  </span>
                  <strong className="workout-session-page__metric-value">
                    {currentExercise.reps}
                  </strong>
                </div>

                <div className="workout-session-page__metric-card">
                  <span className="workout-session-page__metric-label">
                    Suggested sets
                  </span>
                  <strong className="workout-session-page__metric-value">
                    {currentExercise.sets}
                  </strong>
                </div>

                <div className="workout-session-page__metric-card">
                  <span className="workout-session-page__metric-label">
                    Suggested Rest
                  </span>
                  <strong className="workout-session-page__metric-value">
                    {currentExercise.rest}
                  </strong>
                </div>
              </div>
            </section>

            {!currentExercise.isFinished ? (
              <section className="card workout-session-page__timer-card">
                <TimerToRest
                  key={`${currentExercise.exerciseId}-${currentExerciseIndex}`}
                  initialSeconds={currentExercise.restTimerSeconds}
                  onCompleteSet={() => handleCompleteSet(currentExerciseIndex)}
                />
                <section className="card workout-session-page__sets-card">
                  <span className="workout-session-page__metric-label">
                    Sets completed
                  </span>

                  <strong
                    className={`workout-session-page__sets-count ${setsStatusClass}`}
                  >
                    {currentExercise.completedSets}
                  </strong>

                  <p>Suggested range: {currentExercise.sets} sets</p>

                  <p className="workout-session-page__sets-feedback">
                    {setsFeedbackText}
                  </p>
                </section>
              </section>
            ) : (
              <section className="card workout-session-page__sets-card">
                <span className="workout-session-page__metric-label">
                  Sets completed
                </span>

                <strong
                  className={`workout-session-page__sets-count ${setsStatusClass}`}
                >
                  {currentExercise.completedSets}
                </strong>
              </section>
            )}

            <section className="workout-session-page__actions">
              {!currentExercise.isFinished ? (
                <Button
                  className="button--outline"
                  onClick={() => handleFinishExercise(currentExerciseIndex)}
                >
                  Finish Exercise
                </Button>
              ) : (
                <Button
                  className="button--outline"
                  onClick={() => handleRestartExercise(currentExerciseIndex)}
                >
                  Restart Exercise
                </Button>
              )}

              <div className="workout-session-page__navigation">
                <div className="workout-session-page__nav-slot">
                  {currentExerciseIndex > 0 && (
                    <Button
                      className="button--outline"
                      onClick={handlePreviousExercise}
                    >
                      Prev
                    </Button>
                  )}
                </div>

                <div className="workout-session-page__nav-slot workout-session-page__nav-slot--right">
                  {currentExerciseIndex < lastExerciseIndex && (
                    <Button
                      className="button--outline"
                      onClick={handleNextExercise}
                    >
                      Next
                    </Button>
                  )}
                </div>
              </div>
            </section>

            {allExercisesFinished && (
              <section className="workout-session-page__finish-actions">
                <Button onClick={handleFinishWorkout}>Finish Workout</Button>

                <Button
                  className="button--outline"
                  onClick={handleRestartWorkout}
                >
                  Restart Workout
                </Button>
              </section>
            )}

            <NavigationButton to="/workout-builder" className="button--ghost">
              Back to Workout Builder
            </NavigationButton>
          </>
        )}
      </main>
    </div>
  );
}
