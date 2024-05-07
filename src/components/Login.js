import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi";
import UserContext from "../contexts/UserContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginDTO = {
    email: email,
    password: password,
  };

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleUsernameChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login(loginDTO)
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data);
          localStorage.setItem("userId", response.data.userId);
          localStorage.setItem("sessionId", response.data.sessionId);
          navigate("/");
        }
      })
      .catch((error) => {
        alert(error);
        navigate("/login");
      });
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <div>
        <label>Username:</label>
        <input type="text" value={email} onChange={handleUsernameChange} />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div>
        <button className="btn-login" type="submit" onClick={handleSubmit}>
          Log In
        </button>
      </div>
    </div>
  );
}

export default Login;
