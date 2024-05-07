import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoggedInContext from "../contexts/LoggedInContext";
import "../styles/App.css";
import UserContext from "../contexts/UserContext";
import { authUser } from "../api/authApi";

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

  return (
    <div>
      {loggedIn ? (
        <div className="landing">
          <button onClick={handleDeposit}>Deposit</button>
          <button onClick={handleWithdrawal}>Whitdrawal</button>
        </div>
      ) : (
        <div className="landing">
          <h3>Please Log In, or Sign Up...</h3>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
