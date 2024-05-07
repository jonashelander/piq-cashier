import "./styles/App.css";
import Cashier from "./components/Cashier";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import SignUp from "./components/Signup";
import Backoffice from "./components/Backoffice";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import LoggedInContext from "./contexts/LoggedInContext";
import Login from "./components/Login";
import UserContext from "./contexts/UserContext";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user: user, setUser: setUser }}>
      <LoggedInContext.Provider
        value={{ loggedIn: loggedIn, setLoggedIn: setLoggedIn }}
      >
        <div className="container">
          {!loggedIn ? (
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/backoffice" element={<Backoffice />} />
              </Routes>
            </BrowserRouter>
          ) : (
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/deposit" element={<Cashier />} />
                <Route path="/withdrawal" element={<Cashier />} />
                <Route path="/backoffice" element={<Backoffice />} />
              </Routes>
            </BrowserRouter>
          )}
        </div>
      </LoggedInContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
