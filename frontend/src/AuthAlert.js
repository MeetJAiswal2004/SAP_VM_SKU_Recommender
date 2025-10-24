import React from 'react';
import './Alertbox.css';
function AuthAlert({ show, onLoginClick, onSignupClick, onClose }) {
  if (!show) {
    return null;
  }

  return (
    <div className="alert-overlay" onClick={onClose}>
      <div className="alert-box" onClick={(e) => e.stopPropagation()}>
        <p>Authentication Required</p>
        <div className="alert-buttons">
          <button className="login-btn" onClick={onLoginClick}>Login</button>
          <button className="signup-btn" onClick={onSignupClick}>Signup</button>
        </div>
        <button className="cancel-btn" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default AuthAlert;