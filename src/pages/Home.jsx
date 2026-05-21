import NavigationButton from "../components/NavigationButton";
import Button from "../components/Button";

export default function Home() {
  return (
    <div className="container">
      <h1>RM Workout Planner</h1>

      <p>
        Calculate your 1RM for each exercise and create a personalized workout
        based on your training goals.
      </p>

      <NavigationButton to={"/login"}>Get Started</NavigationButton>
    </div>
  );
}
