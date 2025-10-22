import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi";
import UserContext from "../contexts/UserContext";
import LoggedInContext from "../contexts/LoggedInContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginDTO = {
    email: email,
    password: password,
  };

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { setLoggedIn } = useContext(LoggedInContext);

  const handleEmailChange = (event) => {
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
          console.log(response.data);
          localStorage.setItem("id", response.data.id);
          localStorage.setItem("token", response.data.token);
          setLoggedIn(true);
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        alert(error);
        navigate("/login");
      });
  };

  return (
    <div className="login container">
      <h2 className="heading-secondary">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label for="email">Email</label>
          <input
            id="email"
            type="text"
            value={email}
            placeholder="Email"
            required
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label for="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            placeholder="Password"
            required
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <button className="btn" type="submit">
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
