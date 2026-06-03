import { useEffect, useState } from "react";
import Button from "./Button";

export default function TimerToRest({
  initialSeconds,
  onCompleteSet = () => {},
}) {
  const [restTimer, setRestTimer] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  const minutes = Math.floor(restTimer / 60);
  const seconds = restTimer % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds,
  ).padStart(2, "0")}`;
  const timerProgress =
    initialSeconds > 0 ? (restTimer / initialSeconds) * 100 : 0;

  useEffect(() => {
    if (!isRunning) return;

    if (restTimer === 0) {
      setIsRunning(false);
      setRestTimer(initialSeconds);

      return;
    }

    const timerId = setTimeout(() => {
      setRestTimer((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [isRunning, restTimer, initialSeconds]);

  return (
    <div className="timer-rest">
      <span className="timer-rest__label">
        {isRunning ? "Rest time" : "Ready for next set"}
      </span>

      <div
        className="timer-rest__circle"
        style={{ "--timer-progress": `${timerProgress}%` }}
      >
        <strong className="timer-rest__value">{formattedTime}</strong>
      </div>

      <p className="timer-rest__status">
        {isRunning
          ? "Recover and prepare for the next set."
          : "Complete a set to start the rest timer."}
      </p>

      {!isRunning && (
        <Button
          onClick={() => {
            onCompleteSet();
            setIsRunning(true);
          }}
        >
          Complete Set
        </Button>
      )}

      {isRunning && (
        <Button
          className="button--secondary"
          onClick={() => {
            setIsRunning(false);
            setRestTimer(initialSeconds);
          }}
        >
          Skip Rest
        </Button>
      )}
    </div>
  );
}
