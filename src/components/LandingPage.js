import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoggedInContext from "../contexts/LoggedInContext";
import "../styles/App.css";
import UserContext from "../contexts/UserContext";
import { authUser } from "../api/authApi";
import { v4 as uuidv4 } from "uuid";

const Landingpage = (props) => {
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
        setLoggedIn(false);
        // navigate("/login"); // om du vill skicka till login-sida
      });
  }, []);

  return (
    <div className="landingpage">
      <h2 className="heading-secondary">Please Log In, or Sign Up...</h2>
    </div>
  );
};

export default Landingpage;
