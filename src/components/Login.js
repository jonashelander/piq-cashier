import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoggedInContext from '../contexts/LoggedInContext';
import { login, test } from '../api/userApi';
import UserContext from '../contexts/UserContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginDTO = {
    email: email,
    password: password
  }

  const navigate = useNavigate();
  const { loggedIn, setLoggedIn } = useContext(LoggedInContext);
  const { user, setUser } = useContext(UserContext);

  const handleUsernameChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login(loginDTO)
      .then(response => {
        if (response.status === 200) {
          setUser(response.data);
          setLoggedIn(true);
          localStorage.setItem('userId', response.data.userId)
          localStorage.setItem('sessionId', response.data.sessionId)
          console.log("sessionId is: " + localStorage.getItem('sessionId'));
          console.log("userId is: " + localStorage.getItem('userId'));
          navigate("/")
        }
      })
      .catch(error => {
        alert(error)
        navigate("/login");
      });
  };

  return (
    <div className='login'>

      <div className='loginHeader'>
        <h1>Login</h1>
      </div>
      <form>
        <div>
          <label>
            Username:
          </label>
          <input type="text" value={email} onChange={handleUsernameChange} />
        </div>
        <div>
          <label>
            Password:
          </label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>Log In</button>
        </div>
      </form>
    </div>
  );
}

export default Login;