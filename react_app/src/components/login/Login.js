import React, { useState } from 'react';
import './Login.css';
import { login } from '../../services/auth_service';
import { getUserDetail } from '../../services/user_service';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Both fields are required.');
    } else {
      setError('');

      const response = await login(email, password);
      localStorage.setItem('accessToken', response.access_token);

      const userDetail = await getUserDetail();
      const user = { email, type: userDetail.role };
      localStorage.setItem('loggedUser', JSON.stringify(user));
      window.location.reload();
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      {!localStorage.getItem('loggedUser') ? (
        <form onSubmit={handleLogin} className="login-form">
          {error && <div className="login-error">{error}</div>}
          <div className="login-input-group">
            <label htmlFor="email" className="login-label">
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              placeholder="Introduce tu email"
            />
          </div>
          <div className="login-input-group">
            <label htmlFor="password" className="login-label">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              placeholder="Introduce tu contraseña"
            />
          </div>
          <button type="submit" className="login-button">
            Iniciar sesión
          </button>
        </form>
      ) : (
        <button
          onClick={() => {
            localStorage.removeItem('loggedUser');
            window.location.reload();
          }}
          className="login-button"
        >
          Cerrar sesión
        </button>
      )}
    </div>
  );
};

export default Login;
