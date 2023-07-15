import { useDispatch } from "react-redux"
import { setRetry } from "../redux/CardSlice/CardSlice"

function RetryButton() {
    const dispatch=useDispatch()
  return (
    <>
        <button className="btn" onClick={()=>dispatch(setRetry())} >Play Again</button>
    </>
  )
}

export default RetryButton