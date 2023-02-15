import "./styles/App.css";
import Cashier from "./components/Cashier";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import LandingPage from "./components/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const loggedIn = true;

function App() {
  return (
    <div className="container">
      <Navbar />
      {loggedIn ?
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/cashier" element={<Cashier />} />
          </Routes>
        </BrowserRouter>
        :
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      }
    </div >
  );
}

export default App;
