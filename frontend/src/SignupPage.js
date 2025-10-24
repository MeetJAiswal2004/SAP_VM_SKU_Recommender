// frontend/src/SignupPage.js

import React, { useState } from 'react';
import axios from 'axios';
import './AuthForm.css';

function SignupPage({ onBackClick, onSignupSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const AUTH_SERVER_URL = process.env.REACT_APP_AUTH_SERVER_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await axios.post(`${AUTH_SERVER_URL}/signup`, {
        username,
        password
      });
      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => {
        onSignupSuccess();
      }, 1000);
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'Signup failed. Username may already exist.';
      setError(errorMessage);
      console.error(err);
    }
  };

  return (
    // <-- BADLAAV: class name ko update kiya gaya
    <div className="auth-container">
      <div className="auth-content">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username (Email)</label>
            <input type="email" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <button type="submit" className="submit-form-button">Create Account</button>
        </form>
        <button className="back-button" onClick={onBackClick}>
          &larr; Back to Recommender
        </button>
      </div>
    </div>
  );
}

export default SignupPage;
