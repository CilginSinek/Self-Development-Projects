import { useSelector } from "react-redux";
import Card from "./Card";

function Cards() {
  const cards = useSelector((state) => state.card.cards);
  console.log(cards)
  return (
    <div>
      {cards.every((item) => item.matched) && <h3>Oyunu Bitirdiniz !</h3>}
      <div className="grid-container">
        {cards.map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </div>      
    </div>

  );
}

export default Cards;
