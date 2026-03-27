import { useState } from "react";
import { useEffect } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Login() {
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
    <div className="container">
      <h1>Start your training</h1>
      <form onSubmit={handleUserSetup}>
        <Input
          label={"Name"}
          type={"text"}
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
        <div>
          <label>Level</label>
          <select value={level} onChange={(e) => setLevel(e.target.value)}>
            <option value="" disabled>
              Select your level
            </option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <Button type="submit">Get Started</Button>
      </form>
    </div>
  );
}
