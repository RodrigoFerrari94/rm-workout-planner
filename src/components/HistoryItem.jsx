export default function HistoryItem({ item }) {
  return (
    <div className="container">
      <h3>{item.exerciseName}</h3>
      <h4>{item.muscleGroup}</h4>
      <p>Weight: {item.weight}Kg</p>
      <p>Reps: {item.reps}</p>
      <p>1 RM: {item.estimated1RM}Kg</p>
      <p>Date: {item.date}</p>
      <p>------------------------------------</p>
    </div>
  );
}
