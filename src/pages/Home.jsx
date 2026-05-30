import { Calculator, Dumbbell, Activity } from "lucide-react";
import NavigationButton from "../components/NavigationButton";

export default function Home() {
  return (
    <div className="page home-page">
      <main className="home-page__hero">
        <div className="home-page__brand">
          <span className="home-page__brand-mark">RM</span>
          <span className="home-page__brand-text">Workout Planner</span>
        </div>

        <h1 className="home-page__headline">
          Plan.
          <br />
          Calculate.
          <br />
          Train.
          <br />
          <span>Progress.</span>
        </h1>

        <p className="home-page__subtitle">
          Turn your strength data into smarter workouts.
        </p>

        <div className="home-page__actions">
          <NavigationButton to="/login" className="home-page__cta">
            Get Started
          </NavigationButton>
        </div>

        <section className="home-page__features">
          <div className="card home-page__feature-card">
            <Calculator className="home-page__feature-icon" size={22} />
            <p>Calculate your 1RM</p>
          </div>

          <div className="card home-page__feature-card">
            <Dumbbell className="home-page__feature-icon" size={22} />
            <p>Build your workout</p>
          </div>

          <div className="card home-page__feature-card">
            <Activity className="home-page__feature-icon" size={22} />
            <p>Track your progress</p>
          </div>
        </section>

        <div className="home-page__footer">
          <span>Already using the app?</span>
          <NavigationButton to="/login" className="button--ghost ">
            Login
          </NavigationButton>
        </div>
      </main>
    </div>
  );
}
