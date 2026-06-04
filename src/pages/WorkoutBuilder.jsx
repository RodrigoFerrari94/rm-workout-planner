import { useEffect, useState } from "react";
import { Flame, Dumbbell, Zap, ShieldCheck } from "lucide-react";
import { ExerciseCard } from "../components/ExerciseCard";
import { trainingGoals } from "../data/trainingGoals";
import Button from "../components/Button";
import Select from "../components/Select.jsx";
import NavigationButton from "../components/NavigationButton";

export default function WorkoutBuilder() {
  const [goal, setGoal] = useState("");
  const [exercisesList, setExercisesList] = useState([]);
  const [currentWorkout, setCurrentWorkout] = useState([]);
  const [isWorkoutLoaded, setIsWorkoutLoaded] = useState(false);

  const CURRENT_WORKOUT_STORAGE_KEY = "currentWorkout";

  useEffect(() => {
    const savedHistory = localStorage.getItem("history");

    if (savedHistory) {
      const parsedHistory = JSON.parse(savedHistory);

      // Keep only the latest 1RM calculation for each exercise
      const latestExercises = [];

      parsedHistory.forEach((item) => {
        const existingIndex = latestExercises.findIndex(
          (exercise) => exercise.exerciseId === item.exerciseId,
        );

        if (existingIndex === -1) {
          latestExercises.push(item);
        } else {
          latestExercises[existingIndex] = item;
        }
      });

      setExercisesList(latestExercises);
    }
  }, []);

  useEffect(() => {
    const savedWorkout = localStorage.getItem(CURRENT_WORKOUT_STORAGE_KEY);

    if (savedWorkout) {
      const parsedWorkout = JSON.parse(savedWorkout);
      setCurrentWorkout(parsedWorkout);
    }

    setIsWorkoutLoaded(true);
  }, []);

  useEffect(() => {
    if (!isWorkoutLoaded) return;

    localStorage.setItem(
      CURRENT_WORKOUT_STORAGE_KEY,
      JSON.stringify(currentWorkout),
    );
  }, [currentWorkout, isWorkoutLoaded]);

  const selectedGoalRules = trainingGoals[goal];

  function handleAddExerciseToWorkout(exercise) {
    if (!goal) {
      return alert("Please select a training goal first");
    }

    const alreadyAdded = currentWorkout.some(
      (workoutExercise) =>
        workoutExercise.exerciseId === exercise.exerciseId &&
        workoutExercise.goal === goal,
    );

    if (alreadyAdded) {
      return alert("This exercise is already added with this training goal.");
    }

    const workoutExercise = {
      exerciseId: exercise.exerciseId,
      exerciseName: exercise.exerciseName,
      muscleGroup: exercise.muscleGroup,
      estimated1RM: exercise.estimated1RM,
      maxLoad: Math.round(
        exercise.estimated1RM * selectedGoalRules.maxPercentage,
      ),
      minLoad: Math.round(
        exercise.estimated1RM * selectedGoalRules.minPercentage,
      ),
      sets: selectedGoalRules.sets,
      reps: selectedGoalRules.reps,
      rest: selectedGoalRules.rest,
      restTimerSeconds: selectedGoalRules.restTimerSeconds,
      goal: goal,
    };

    setCurrentWorkout((prevWorkout) => [...prevWorkout, workoutExercise]);

    const formattedGoal = goal.charAt(0).toUpperCase() + goal.slice(1);

    alert(
      `${exercise.exerciseName} was added to the workout as ${formattedGoal}.`,
    );
  }

  function handleRemoveExerciseFromWorkout(indexToRemove) {
    setCurrentWorkout((prevWorkout) =>
      prevWorkout.filter((exercise, index) => index !== indexToRemove),
    );
  }

  return (
    <div className="page workout-builder-page">
      <header className="workout-builder-page__header">
        <h1 className="workout-builder-page__title">Build Workout</h1>
        <p className="workout-builder-page__subtitle">
          Select a goal, then add exercises. You can change the goal between
          exercises.
        </p>
      </header>

      <main className="page__content workout-builder-page__content">
        {exercisesList.length === 0 ? (
          <section className="card workout-builder-page__empty">
            <h2>No calculated exercises found</h2>
            <p>Calculate your 1RM first to build a workout.</p>

            <NavigationButton to="/calculator">Calculate 1RM</NavigationButton>
          </section>
        ) : (
          <>
            <section className="card workout-builder-page__goal-card">
              <div className="workout-builder-page__goal-header">
                <h2>Goal for next exercises</h2>
              </div>

              <div className="workout-builder-page__goal-options">
                <button
                  type="button"
                  className={`goal-option ${
                    goal === "adaptation" ? "goal-option--selected" : ""
                  }`}
                  onClick={() => setGoal("adaptation")}
                >
                  <span className="goal-option__icon goal-option__icon--adaptation">
                    <ShieldCheck size={22} strokeWidth={2.5} />
                  </span>

                  <span className="goal-option__content">
                    <strong>Adaptation</strong>
                    <small>12-15 reps · 50% 1RM</small>
                  </span>
                </button>

                <button
                  type="button"
                  className={`goal-option ${
                    goal === "strength" ? "goal-option--selected" : ""
                  }`}
                  onClick={() => setGoal("strength")}
                >
                  <span className="goal-option__icon goal-option__icon--strength">
                    <Flame size={22} strokeWidth={2.5} />
                  </span>

                  <span className="goal-option__content">
                    <strong>Strength</strong>
                    <small>1-5 reps · 85-95% 1RM</small>
                  </span>
                </button>

                <button
                  type="button"
                  className={`goal-option ${
                    goal === "hypertrophy" ? "goal-option--selected" : ""
                  }`}
                  onClick={() => setGoal("hypertrophy")}
                >
                  <span className="goal-option__icon goal-option__icon--hypertrophy">
                    <Dumbbell size={22} strokeWidth={2.5} />
                  </span>

                  <span className="goal-option__content">
                    <strong>Hypertrophy</strong>
                    <small>8-12 reps · 70-84% 1RM</small>
                  </span>
                </button>

                <button
                  type="button"
                  className={`goal-option ${
                    goal === "endurance" ? "goal-option--selected" : ""
                  }`}
                  onClick={() => setGoal("endurance")}
                >
                  <span className="goal-option__icon goal-option__icon--endurance">
                    <Zap size={22} strokeWidth={2.5} />
                  </span>

                  <span className="goal-option__content">
                    <strong>Endurance</strong>
                    <small>12-20 reps · 55-69% 1RM</small>
                  </span>
                </button>
              </div>
            </section>

            <section className="workout-builder-page__section">
              <div className="workout-builder-page__section-header">
                <h2>Available Exercises</h2>

                <NavigationButton to="/calculator" className="button--ghost">
                  Back to Calculator
                </NavigationButton>
              </div>

              <div className="workout-builder-page__list">
                {exercisesList.map((exercise) => (
                  <ExerciseCard
                    key={exercise.exerciseId}
                    exercise={exercise}
                    onAddExercise={handleAddExerciseToWorkout}
                  />
                ))}
              </div>
            </section>

            <section className="card workout-builder-page__current">
              <div className="workout-builder-page__section-header">
                <h2>Current Workout ({currentWorkout.length})</h2>
              </div>

              {currentWorkout.length === 0 ? (
                <div className="workout-builder-page__empty-current">
                  <p>No exercises added yet.</p>
                  <p>Select a goal and add exercises to build your workout.</p>
                </div>
              ) : (
                <div className="workout-builder-page__list">
                  {currentWorkout.map((selectedExercise, index) => (
                    <div
                      className="card card--nested workout-builder-page__workout-card"
                      key={`${selectedExercise.exerciseId}-${selectedExercise.goal}-${index}`}
                    >
                      <h3>
                        {selectedExercise.exerciseName}{" "}
                        <span className="workout-builder-page__goal-badge">
                          {selectedExercise.goal}
                        </span>
                      </h3>
                      <h4>{selectedExercise.muscleGroup}</h4>

                      <p>
                        Sets: {selectedExercise.sets} · Reps:{" "}
                        {selectedExercise.reps}
                      </p>

                      <p>Rest: {selectedExercise.rest}</p>

                      <p>
                        Load range: {selectedExercise.minLoad} kg -{" "}
                        {selectedExercise.maxLoad} kg
                      </p>

                      <Button
                        className="button--danger"
                        onClick={() => handleRemoveExerciseFromWorkout(index)}
                      >
                        Delete
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {currentWorkout.length > 0 && (
                <NavigationButton to="/workout-session">
                  Start Workout
                </NavigationButton>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}
