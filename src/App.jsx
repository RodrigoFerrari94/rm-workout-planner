import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Calculator from "./pages/Calculator";
import WorkoutBuilder from "./pages/WorkoutBuilder";
import WorkoutSession from "./pages/WorkoutSession";

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
      </Routes>
    </Router>
  );
}

export default App;
