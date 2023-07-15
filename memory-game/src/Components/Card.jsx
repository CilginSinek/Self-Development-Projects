/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { setOpen, setSelect } from "../redux/CardSlice/CardSlice";

function Card({ item }) {
  const dispatch = useDispatch();

  const HandleClick = () => {
    if (item.matched) return false;
    dispatch(setOpen(item));
    setTimeout(() => {
      dispatch(setSelect(item));
    }, 1000);
  };

  return (
    <div className="grid-item scene">
      <div
        className={`${item.opened ? "opened " : ""} card`}
        onClick={HandleClick}
      >
        <div className="card__face card__face--front">
          <span>
            <img
              src="https://cdn.create.vista.com/api/media/small/75852375/stock-vector-isolated-blue-icon-with-white"
            />
          </span>
        </div>
        <div className="card__face card__face--back">
          <span>
            <img className={`${item.matched ? "matched" : ""} sex`} src={item.img} />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;
