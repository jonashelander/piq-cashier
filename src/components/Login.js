import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoggedInContext from '../contexts/LoggedInContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { loggedIn, setLoggedIn } = useContext(LoggedInContext);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoggedIn(true);
    navigate("/");
  };

  return (
    <div className='login'>

      <div className='loginHeader'>
        <h1>Login</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username:
          </label>
          <input type="text" value={username} onChange={handleUsernameChange} />
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