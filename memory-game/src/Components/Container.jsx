import Header from "./Header";
import Score from "./Score";
import Cards from "./Cards";
import './style.css'
import RetryButton from "./RetryButton";

function Container() {
  return (
    <div className="container" >
      <Header />
      <Score />
      <Cards />
      <RetryButton/>
    </div>
  );
}

export default Container;
