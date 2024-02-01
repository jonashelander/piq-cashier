import { useContext, useEffect, useState } from "react";
import "../styles/App.css";
import LoggedInContext from "../contexts/LoggedInContext";
import UserContext from "../contexts/UserContext";
// import { useKeycloak } from "@react-keycloak/web";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../api/authApi";
import { authUser } from "../api/authApi";


function Navbar() {
  const { loggedIn, setLoggedIn } = useContext(LoggedInContext);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const authDTO = {
    userId: user.userId,
    sessionId: user.sessionId
  }

  const handleSignUp = () => {
    navigate("/signup");
  }

  const handleLogIn = (event) => {
    event.preventDefault();
    navigate("/login");
  }

  const handleLogOut = () => {
    logOut(user.userId)
      .then(
        setLoggedIn(false)
      )
    navigate("/");
  }

  const handleNavigateHome = () => {
    navigate("/");
    window.location.reload(false);
  }

  const handleNavigateToBackoffice = () => {
    navigate("/backoffice");
  }

  const [balance, setBalance] = useState(90);
  // const { keycloak, initialized } = useKeycloak();


  return (
    <header className="navbar">
      <div className="navbarRoutes">
        <button className="cashierLink" onClick={handleNavigateHome}>Cashier</button>
      <button className="boLink" onClick={handleNavigateToBackoffice}>Backoffice</button>
      </div>
      {loggedIn ?
        <p>Balance: <span>{user.balance} </span></p>
        : null}

      <nav>
        {loggedIn ? (
          <div className="signOut">
            <p>{user.email}</p>
            <button onClick={handleLogOut}>Sign Out</button>
          </div>
        )
          :
          (
            <div className="signOutlogged">
              <button className="signIn" onClick={handleLogIn}>Sign In</button>
              <button className="signUp" onClick={handleSignUp}>Sign Up</button>
            </div>
          )
        }

        {/* {!keycloak.authenticated && (
          <button
            type="button"
            onClick={() => keycloak.login()}
          >
            Login
          </button>
        )}

        {!!keycloak.authenticated && (
          <button
            type="button"
            onClick={() => keycloak.logout()}
          >
            Logout ({keycloak.tokenParsed.preferred_username})
          </button>
        )} */}
      </nav>
    </header>
  );
}

export default Navbar;
