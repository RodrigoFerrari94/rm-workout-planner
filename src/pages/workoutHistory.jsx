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
    <div>
      <h1>Workout History</h1>
      {completedWorkouts.length === 0 ? (
        <div>
          <p>No completed workouts yet.</p>
          <p>Finish a workout session to see it here.</p>
          <NavigationButton to="/calculator">Go to Calculator</NavigationButton>
        </div>
      ) : (
        <div>
          <div className="container">
            {completedWorkouts.map((workout) => {
              return (
                <div className="card" key={workout.id}>
                  <h2>Workout Completed</h2>
                  <p>Date: {workout.date}</p>
                  <p>Total exercises: {workout.totalExercises}</p>
                  <h3>Exercises</h3>
                  {workout.exercises.map((exerciseCompleted, index) => {
                    return (
                      <div
                        className="card  card--nested"
                        key={`${workout.id}-${exerciseCompleted.exerciseId}-${index}`}
                      >
                        <p>{exerciseCompleted.exerciseName}</p>
                        <p>Goal: {exerciseCompleted.goal}</p>
                        <p>Completed Sets: {exerciseCompleted.completedSets}</p>
                        <p>
                          Load range: {exerciseCompleted.minLoad}Kg -{" "}
                          {exerciseCompleted.maxLoad}Kg
                        </p>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
          <Button onClick={handleClearHistory}>Clear History</Button>
        </div>
      )}
    </div>
  );
}
