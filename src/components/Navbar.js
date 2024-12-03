import { useContext, useEffect, useState } from "react";
import "../styles/App.css";
import "../styles/General.css";
import LoggedInContext from "../contexts/LoggedInContext";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { logOut } from "../api/authApi";
import { CurrencyEur, SignOut, UserCircle } from "@phosphor-icons/react";

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
    if (window.location.pathname === "/") {
      window.location.reload(false);
    } else {
      navigate("/");
    }
  };

  const handleNavigateToBackoffice = () => {
    navigate("/backoffice");
  };

  const [balance, setBalance] = useState(90);

  return (
    <header className="header">
      <div className="logo-box" onClick={handleNavigateHome}>
        <span className="logo">Cashier</span>
        {/* <CoinVertical size={44} color="#DC5400" /> */}
      </div>

      {loggedIn ? (
        /* RENAME THIS CLASS AT SOME POINT */ 
        <div className="user-settings">
          <div className="user-balance">
            <CurrencyEur weight="thin" size={30} />
            <span className="balance">{user.balance}</span>
          </div>

          <div className="user-name">
            <UserCircle size={30} weight="thin" className="user-avatar" />
            <span className="email">{user.email}</span>
          </div>

          {/* <div className="signout-btn"> */}
          <button
            className="btn btn--outline signout-btn"
            onClick={handleLogOut}
          >
            <SignOut weight="thin" size={30} />
            Sign Out
          </button>
          {/* </div> */}
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
