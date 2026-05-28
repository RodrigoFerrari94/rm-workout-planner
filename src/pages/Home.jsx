import NavigationButton from "../components/NavigationButton";

export default function Home() {
  return (
    <div className="page home-page">
      <header className="page__header home-page__hero">
        <p className="home-page__eyebrow">RM Workout Planner</p>

        <h1 className="page__title">Plan. Calculate. Train. Progress.</h1>

        <p className="page__subtitle">
          Calculate your estimated 1RM, build goal-based workouts, and track
          every training session.
        </p>

        <NavigationButton to="/login">Get Started</NavigationButton>
      </header>

      <main className="page__content home-page__content">
        <div className="card home-page__feature-card">
          <h2>Calculate your 1RM</h2>
          <p>
            Estimate your maximum strength based on the weight and reps you
            already perform.
          </p>
        </div>

        <div className="card home-page__feature-card">
          <h2>Build smarter workouts</h2>
          <p>
            Generate training suggestions based on strength, hypertrophy, or
            endurance goals.
          </p>
        </div>

        <div className="card home-page__feature-card">
          <h2>Track your sessions</h2>
          <p>
            Complete sets, control rest time, finish workouts, and review your
            workout history.
          </p>
        </div>
      </main>
    </div>
  );
}
