import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Usuarios predefinidos para testear
  const predefinedUsers = {
    specialist: { username: 'especialista', password: 'especialista123' },
    patient: { username: 'paciente', password: 'paciente123' },
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Both fields are required.');
    } else {
      setError('');
      // Credenciales predefinidas para testear - borrar luego
      if (
        (username === predefinedUsers.specialist.username &&
          password === predefinedUsers.specialist.password) ||
        (username === predefinedUsers.patient.username &&
          password === predefinedUsers.patient.password)
      ) {
        const userType = username.includes('especialista')
          ? 'specialist'
          : 'patient';
        const user = { username, type: userType };
        localStorage.setItem('loggedUser', JSON.stringify(user));
        window.location.reload();
      } else {
        setError('Invalid credentials.');
      }
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      {!localStorage.getItem('loggedUser') ? (
        <form onSubmit={handleLogin} className="login-form">
          {error && <div className="login-error">{error}</div>}
          <div className="login-input-group">
            <label htmlFor="username" className="login-label">
              Nombre de usuario
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-input"
              placeholder="Introduce tu nombre de usuario"
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
