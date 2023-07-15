/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { setOpen, setSelect } from "../redux/CardSlice/CardSlice";

function Card({ item }) {
  const dispatch = useDispatch();

  const HandleClick = () => {
    if (item.matched) return false;
    //* eslesmis mi sorgusu
    dispatch(setOpen(item));
    //* Karti aciyorum
    setTimeout(() => {
      dispatch(setSelect(item));
    }, 2000);
    //* Kart eslesmis mi sorgusu (kart kapanmasin diye timeout)
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
            <img className={item.matched ? "matched" : ""} src={item.img} />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;
