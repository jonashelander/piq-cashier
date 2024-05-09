import { useContext, useEffect, useState } from "react";
import "../styles/App.css";
import "../styles/General.css";
import LoggedInContext from "../contexts/LoggedInContext";
import UserContext from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../api/authApi";
import { authUser } from "../api/authApi";
import profile from "../img/profile.jpg";
import { CashRegister, CoinVertical } from "@phosphor-icons/react";

function Navbar() {
  const { loggedIn, setLoggedIn } = useContext(LoggedInContext);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const authDTO = {
    userId: user.userId,
    sessionId: user.sessionId,
  };

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

  const handleNavigateHome = () => {
    navigate("/");
    window.location.reload(false);
  };

  const handleNavigateToBackoffice = () => {
    navigate("/backoffice");
  };

  const [balance, setBalance] = useState(90);

  return (
    <header className="header">
      <div className="logo-box" onClick={() => navigate("/")}>
        <span className="logo">Cashier</span>
        <CoinVertical size={44} color="#DC5400" />
      </div>

      {loggedIn ? (
        <div className="user">
          <span className="user-username">Logged in as: {user.email}</span>
          <span className="user-balance">Balance: € {user.balance} </span>
          <div className="img-box">
            <img className="user-avatar" src={profile} alt="profile-avatar" />
          </div>
          <a className="btn" onClick={handleLogOut}>
            Sign Out
          </a>
        </div>
      ) : (
        <div className="user">
          <button className="btn" onClick={handleLogIn}>
            Sign In
          </button>

          <button className="btn" onClick={handleSignUp}>
            Sign Up
          </button>
        </div>
      )}
    </header>
  );
}

export default Navbar;
