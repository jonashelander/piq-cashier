import { useContext, useState } from "react";
import "../styles/Navbar.css";
import LoggedInContext from "../contexts/LoggedInContext";
// import { useKeycloak } from "@react-keycloak/web";


function Navbar() {
  const { setLoggedIn } = useContext(LoggedInContext);

  const handleLogIn = () => {
    setLoggedIn(true);
  }

  const handleLogOut = () => {
    setLoggedIn(false);
  }

  const [balance, setBalance] = useState(1000);
  // const { keycloak, initialized } = useKeycloak();

  const test = () => setBalance(balance + 10);


  return (
    <header className="navbar">
      <h1>PaymentIQ Casino Demo</h1>
      <h3>Balance: $ {balance}</h3>

      <nav>
        <button onClick={handleLogIn}>Log In</button>

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
