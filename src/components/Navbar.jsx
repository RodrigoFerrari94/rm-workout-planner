import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link> |<Link to="/login">Login</Link> |
      <Link to="/calculator">Calculator</Link> |
      <Link to="/workout-history">Workout History</Link> |
    </nav>
  );
}
