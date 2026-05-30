import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import Select from "../components/Select";

export default function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [level, setLevel] = useState("");

  function handleUserSetup(e) {
    e.preventDefault();
    if (!name) {
      alert("Name is required");
      return;
    }

    if (!weight) {
      alert("Weight is required");
      return;
    }

    if (!level) {
      alert("Level is required");
      return;
    }

    const userData = {
      name,
      weight,
      level,
    };

    localStorage.setItem("user", JSON.stringify(userData));

    setName("");
    setWeight("");
    setLevel("");

    navigate("/calculator");
  }

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);

      setName(parsedUser.name);
      setWeight(parsedUser.weight);
      setLevel(parsedUser.level);
    }
  }, []);

  return (
    <div className="page login-page">
      <header className="page__header login-page__header">
        <div className="login-page__avatar">RM</div>

        <h1 className="page__title">Set up your profile</h1>

        <p className="page__subtitle">
          Add your basic information to start planning smarter workouts.
        </p>
      </header>

      <main className="page__content">
        <form className="card login-page__form" onSubmit={handleUserSetup}>
          <Input
            label="Name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            label="Weight"
            type="number"
            placeholder="Enter your weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />

          <Select
            label="Level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="" disabled>
              Select your level
            </option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </Select>

          <Button type="submit">Continue</Button>
        </form>

        <p className="login-page__note">
          Your information is saved only on this device.
        </p>
      </main>
    </div>
  );
}
