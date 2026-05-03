import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Calculator from "./pages/Calculator";
import WorkoutBuilder from "./pages/WorkoutBuilder";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/workoutBuilder" element={<WorkoutBuilder />} />
      </Routes>
    </Router>
  );
}

export default App;
