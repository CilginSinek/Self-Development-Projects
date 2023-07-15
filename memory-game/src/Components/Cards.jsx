import { useSelector } from "react-redux";
import Card from "./Card";

function Cards() {
  const cards = useSelector((state) => state.card.cards);
  return (
    <div>
      {cards.every((item) => item.matched) && <h3>Oyunu Bitirdiniz !</h3>}
      {/* butun kartlar matchlendiginde gosterilecek yazi */}
      <div className="grid-container">
        {cards.map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </div>
      {/* gridboxda kartlarimi yazdiriyorum */}
    </div>
  );
}

export default Cards;
