import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoggedInContext from "../contexts/LoggedInContext";
import "../styles/App.css";
import UserContext from "../contexts/UserContext";
import { authUser } from "../api/authApi";
import Cashier from "./Cashier";

const LandingPage = (props) => {
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn } = useContext(LoggedInContext);
  const { user, setUser } = useContext(UserContext);
  const userId = localStorage.getItem("userId");
  const sessionId = localStorage.getItem("sessionId");
  const authDTO = {
    userId: userId,
    sessionId: sessionId,
  };

  useEffect(() => {
    authUser(authDTO)
      .then((response) => {
        setUser(response.data);
        setLoggedIn(true);
      })
      .catch((error) => {
        console.error("Authentication failed:", error);
      });
  }, []);

  const handleDeposit = () => {
    navigate("/deposit", { state: { method: "deposit" } });
  };
  const handleWithdrawal = () => {
    navigate("/withdrawal", { state: { method: "withdrawal" } });
  };

  const handleReload = () => {
    window._PaymentIQCashierReset();
  };

  return (
    <main>
      {loggedIn ? (
        <Cashier />
      ) : (
        <div className="hero">
          <h3>Please Log In, or Sign Up...</h3>
        </div>
      )}
    </main>
  );
};

export default LandingPage;
