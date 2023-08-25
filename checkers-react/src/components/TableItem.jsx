/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { selectStone, goStone } from "../redux/checkersSlice";
import { useEffect, useState } from "react";

function TableItem({ item, selected }) {
  const [isSelected, setIsSelected] = useState(item.x+item.y === selected)
  const dispatch = useDispatch();

  const handleGoStone = () => {
    if (item.stone === null) {
      dispatch(goStone(item));
    }
  };

  useEffect(()=>{
    setIsSelected(item.x+item.y === selected)
  },[selected,item])

  return (
    <div
      className={item.nowCanGo ? "nowCanGo" : item.canGo ? "blackBox" : "whiteBox"}
      onClick={handleGoStone}
    >
      {item.stone && (
        <div
          onClick={() => dispatch(selectStone(item))}
          className={isSelected ? "selectedStone" : item.stone === "white" ? "whiteStone" : "blackStone"}
        ></div>
      )}
    </div>
  );
}

export default TableItem;
