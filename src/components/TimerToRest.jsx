import { useEffect, useState } from "react";

export default function TimerToRest({
  initialSeconds,
  onCompleteSet = () => {},
}) {
  const [restTimer, setRestTimer] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

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
    <div className="container">
      <p>Rest time: {restTimer}s</p>

      {!isRunning && (
        <div>
          <button
            onClick={() => {
              onCompleteSet();
              setIsRunning(true);
            }}
          >
            Complete Set
          </button>
          <p>LET'S GO!!!</p>
        </div>
      )}
      {isRunning && (
        <div>
          <button
            onClick={() => {
              setIsRunning(false);
              setRestTimer(initialSeconds);
            }}
          >
            Skip Rest
          </button>
          <p>Resting...</p>
        </div>
      )}
    </div>
  );
}
