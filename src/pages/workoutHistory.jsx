import { useState, useEffect } from "react";
import NavigationButton from "../components/NavigationButton";
import Button from "../components/Button";

export default function WorkoutHistory() {
  const [completedWorkouts, setCompletedWorkouts] = useState([]);

  const COMPLETED_WORKOUTS_STORAGE_KEY = "completedWorkouts";

  useEffect(() => {
    const savedCompletedWorkouts = localStorage.getItem(
      COMPLETED_WORKOUTS_STORAGE_KEY,
    );

    if (savedCompletedWorkouts) {
      const parsedCompletedWorkouts = JSON.parse(savedCompletedWorkouts);

      setCompletedWorkouts(parsedCompletedWorkouts);
    }
  }, []);

  function handleClearHistory() {
    const confirmedClear = confirm(
      "This will clear your workout history. Continue?",
    );

    if (confirmedClear) {
      setCompletedWorkouts([]);
      localStorage.removeItem(COMPLETED_WORKOUTS_STORAGE_KEY);
    }
  }
  return (
    <div className="page workout-history-page">
      <header className="workout-history-page__header">
        <h1 className="workout-history-page__title">Workout History</h1>
        <p className="workout-history-page__subtitle">
          Review your completed workout sessions and track your training
          progress.
        </p>
      </header>

      <main className="page__content workout-history-page__content">
        {completedWorkouts.length === 0 ? (
          <section className="card workout-history-page__empty">
            <h2>No completed workouts yet</h2>
            <p>Finish a workout session to see it here.</p>

            <NavigationButton to="/calculator">
              Go to Calculator
            </NavigationButton>
          </section>
        ) : (
          <>
            <section className="workout-history-page__section-header">
              <div>
                <h2>Completed Workouts</h2>
                <p>{completedWorkouts.length} workout session(s)</p>
              </div>

              <Button className="button--danger" onClick={handleClearHistory}>
                Clear History
              </Button>
            </section>

            <section className="workout-history-page__list">
              {completedWorkouts.map((workout) => {
                return (
                  <article
                    className="card workout-history-page__workout-card"
                    key={workout.id}
                  >
                    <div className="workout-history-page__workout-header">
                      <div>
                        <h2>Workout Completed</h2>
                        <p>{workout.date}</p>
                      </div>

                      <span className="workout-history-page__badge">
                        {workout.totalExercises} exercises
                      </span>
                    </div>

                    <div className="workout-history-page__exercise-list">
                      {workout.exercises.map((exerciseCompleted, index) => {
                        return (
                          <div
                            className="card card--nested workout-history-page__exercise-card"
                            key={`${workout.id}-${exerciseCompleted.exerciseId}-${index}`}
                          >
                            <div>
                              <h3>{exerciseCompleted.exerciseName}</h3>
                              <p>{exerciseCompleted.goal}</p>
                            </div>

                            <div className="workout-history-page__exercise-details">
                              <span>
                                {exerciseCompleted.completedSets} sets
                              </span>

                              <span>
                                {exerciseCompleted.minLoad}kg -{" "}
                                {exerciseCompleted.maxLoad}kg
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </article>
                );
              })}
            </section>
          </>
        )}
      </main>
    </div>
  );
}
