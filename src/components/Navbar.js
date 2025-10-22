import { useContext, useEffect, useState } from "react";
import "../styles/App.css";
import LoggedInContext from "../contexts/LoggedInContext";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { logOut } from "../api/authApi";
import { authUser } from "../api/authApi";

function Navbar() {
  const { loggedIn, setLoggedIn } = useContext(LoggedInContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleLogIn = (event) => {
    event.preventDefault();
    navigate("/login");
  };

  const handleLogOut = () => {
    logOut(user.userId).then(setLoggedIn(false));
    navigate("/");
  };

  return (
    <header className="header">
      {loggedIn ? (
        <nav className="main-nav">
          <ul className="main-nav-list">
            <li>
              <p className="user-userId">{user.email}</p>
            </li>
            <li>
              <button className="btn main-nav-link" onClick={handleLogOut}>
                Sign Out
              </button>
            </li>
          </ul>
        </nav>
      ) : (
        <nav className="main-nav">
          <ul className="main-nav-list">
            <li>
              <button className="btn main-nav-link" onClick={handleLogIn}>
                Sign In
              </button>
            </li>
            <li>
              <button className="btn main-nav-link" onClick={handleSignUp}>
                Sign Up
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
