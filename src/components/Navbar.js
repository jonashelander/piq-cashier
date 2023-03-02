import { useContext, useState } from "react";
import "../styles/App.css";
import LoggedInContext from "../contexts/LoggedInContext";
// import { useKeycloak } from "@react-keycloak/web";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { loggedIn, setLoggedIn } = useContext(LoggedInContext);
  const navigate = useNavigate();

  const handleSignUp = () => {
    // Navigate to Sign up page
  }

  const handleLogIn = () => {
    setLoggedIn(true);
    navigate("/");
  }

  const handleLogOut = () => {
    setLoggedIn(false);
    navigate("/");
  }

  const [balance, setBalance] = useState(90);
  // const { keycloak, initialized } = useKeycloak();

  return (
    <header className="navbar">
      <h1>Merchant Platform Demo</h1>
      {loggedIn ?
        <h3>Balance: $ {balance}</h3>
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
