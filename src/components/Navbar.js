import { useContext, useEffect, useState } from "react";
import "../styles/App.css";
import LoggedInContext from "../contexts/LoggedInContext";
import UserContext from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../api/authApi";
import { authUser } from "../api/authApi";

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
    <section className="nav-section">
      <div className="nav-routes">
        <button className="btn" onClick={handleNavigateHome}>
          Cashier
        </button>
        <button className="btn" onClick={handleNavigateToBackoffice}>
          Backoffice
        </button>
      </div>
      {loggedIn ? (
        <p>
          Balance: <span>{user.balance} </span>
        </p>
      ) : null}
      {loggedIn ? (
        <div className="nav-user">
          <p className="user">Logged in as:</p>
          <p>{user.email}</p>
          <button className="btn" onClick={handleLogOut}>
            Sign Out
          </button>
        </div>
      ) : (
        <div className="nav-user">
          <button className="btn" onClick={handleLogIn}>
            Sign In
          </button>
          <button className="btn" onClick={handleSignUp}>
            Sign Up
          </button>
        </div>
      )}
    </section>
  );
}

export default Navbar;
