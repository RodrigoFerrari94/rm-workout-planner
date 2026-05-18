import { useEffect, useState } from "react";

export default function Timer({ initialSeconds }) {
  const [restTimer, setRestTimer] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    if (restTimer === 0) {
      setIsRunning(false);
      return;
    }

    const timerId = setTimeout(() => {
      setRestTimer((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [isRunning, restTimer]);

  return (
    <div className="container">
      <p>Rest time: {restTimer}s</p>

      <button onClick={() => setIsRunning(true)}>Start</button>

      <button
        onClick={() => {
          setIsRunning(false);
          setRestTimer(initialSeconds);
        }}
      >
        Reset
      </button>
    </div>
  );
}
