import { useContext, useEffect, useState } from "react";
import "../styles/App.css";
import "../styles/General.css";
import LoggedInContext from "../contexts/LoggedInContext";
import UserContext from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../api/authApi";
import { authUser } from "../api/authApi";
import { CashRegister, CoinVertical } from "@phosphor-icons/react";

function Navbar() {
  const { loggedIn, setLoggedIn } = useContext(LoggedInContext);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const authDTO = {
    userId: user.userId,
    sessionId: user.sessionId,
  };

  useEffect(() => {}, [user]);

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
    window._PaymentIQCashierReset();
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
        <div className="user">
          <p className="user-username">Logged in as: {user.email}</p>
          <p className="user-balance">
            Balance: € <span className="balance">{user.balance}</span>
          </p>
          {/* <div className="user-avatar">
            <img className="avatar" src={profile} alt="profile-avatar" />
          </div> */}
          <button className="btn btn--outline" onClick={handleLogOut}>
            Sign Out
          </button>
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
