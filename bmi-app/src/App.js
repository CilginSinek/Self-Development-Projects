import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import './App.css';
import Home from './Components/Pages/Home'
import Whats from "./Components/Pages/Whats";
import NoPage from "./Components/Pages/NoPage";
import { BMISProvider } from "./context/BMIS";

function App() {
  return (
    <BMISProvider>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <NavLink exact to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/Whats">What is BMI</NavLink>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/Whats" Component={Whats}/>
            <Route exact="true" path="/" Component={Home}/>
            <Route path="*" Component={NoPage}/>
          </Routes>
        </div>
      </Router>
    </BMISProvider>

  );
}

export default App;
