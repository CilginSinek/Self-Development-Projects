import TableItem from "./TableItem";
import { useSelector } from "react-redux";

function Table() {
  const table = useSelector((state) => state.checkers.table);
  const selected = useSelector((state)=>state.checkers.selectedStone)
  return (
    <div className="gridBox" >
      {table.map((item, index) => (
        <TableItem item={item} key={index} selected={selected} />
      ))}
    </div>
  );
}

export default Table;
