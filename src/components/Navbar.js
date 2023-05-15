import { useContext, useState } from "react";
import "../styles/App.css";
import LoggedInContext from "../contexts/LoggedInContext";
import UserContext from "../contexts/UserContext";
// import { useKeycloak } from "@react-keycloak/web";
import { Link, useNavigate } from "react-router-dom";


function Navbar() {
  const { loggedIn, setLoggedIn } = useContext(LoggedInContext);
  const { user, setUset } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup");
  }

  const handleLogIn = (event) => {
    event.preventDefault();
    navigate("/login");
  }

  const handleLogOut = () => {
    setLoggedIn(false);
    navigate("/");
  }

  const handleNavigateHome = () => {
    navigate("/");
  }

  const [balance, setBalance] = useState(90);
  // const { keycloak, initialized } = useKeycloak();

  return (
    <header className="navbar">
      <h1 onClick={handleNavigateHome}>Cashier</h1>
      {loggedIn ?
        <p>Balance: <span>{user.balance} </span></p>
        : null}

      <nav>
        {loggedIn ? (
          <button onClick={handleLogOut}>Log Out</button>
        )
          :
          (
            <div>
              <button onClick={handleLogIn}>Log In</button>
              <button onClick={handleSignUp}>Sign Up</button>
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
