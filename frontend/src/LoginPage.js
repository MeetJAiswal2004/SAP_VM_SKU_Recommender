// frontend/src/LoginPage.js

import React, { useState } from 'react';
import axios from 'axios';
import './AuthForm.css';

function LoginPage({ onBackClick, onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const AUTH_SERVER_URL = process.env.REACT_APP_AUTH_SERVER_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${AUTH_SERVER_URL}/login`, {
        username,
        password
      });
      if (onLoginSuccess) {
        onLoginSuccess(response.data.show_agreement, username);
      }
    } catch (err) {
      setError('Login failed. Please check username and password.');
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-form-button">Submit</button>
        </form>

        <button className="back-button" onClick={onBackClick}>
          &larr; Back to Recommender
        </button>
      </div>
    </div>
  );
}

export default LoginPage;



