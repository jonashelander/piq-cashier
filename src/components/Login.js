import { useState } from 'react';

function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Code to submit login form
  };

  return (
    <div className='login'>
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
          <button type="submit">Log In</button>
        </div>
      </form>
    </div>
  );
}

export default LoginScreen;