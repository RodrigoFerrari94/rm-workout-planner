export default function HistoryItem({item}) {
  return (
    <div className="container" key={item.id}>
          <p>Exercise: {item.exercise}</p>
          <p>Weight: {item.weight}Kg</p>
          <p>Reps: {item.reps}</p>
          <p>1 RM: {item.result}Kg</p>
          <p>Date: {item.date}</p>
          <p>------------------------------------</p>
        </div>
  )
}