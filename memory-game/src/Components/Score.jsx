import { useSelector } from "react-redux";

function Score() {
  const score = useSelector((state) => state.card.Score);
  return (
    <div>
      {score === 750 && <h4>Maksimum Skor!</h4>}
      <h3>Score: {score}</h3>
    </div>
  );
}

export default Score;
