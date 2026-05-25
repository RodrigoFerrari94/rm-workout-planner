import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Calculator from "./pages/Calculator";
import WorkoutBuilder from "./pages/WorkoutBuilder";
import WorkoutSession from "./pages/WorkoutSession";
import WorkoutHistory from "./pages/workoutHistory";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/workout-builder" element={<WorkoutBuilder />} />
        <Route path="/workout-session" element={<WorkoutSession />} />
        <Route path="/workout-history" element={<WorkoutHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
