import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="navbar__brand">
        <span className="navbar__brand-mark">RM</span>
        <span className="navbar__brand-text">Workout Planner</span>
      </Link>

      <nav className="navbar__links" aria-label="Main navigation">
        <Link className="navbar__link" to="/">
          Home
        </Link>

        <Link className="navbar__link" to="/login">
          Login
        </Link>

        <Link className="navbar__link" to="/calculator">
          Calculator
        </Link>

        <Link className="navbar__link" to="/workout-history">
          History
        </Link>
      </nav>
    </header>
  );
}

