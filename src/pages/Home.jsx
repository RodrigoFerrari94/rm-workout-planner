import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>RM Workout Planner</h1>

      <p>
        Calculate your 1RM for each exercise and create a personalized workout
        based on your training goals.
      </p>

      <Button onClick={() => navigate("/login")}>Get Started</Button>
    </div>
  );
}
