// AgreementPage.js

import React, { useState } from 'react';
import axios from 'axios';
import './AgreementPage.css';

// const AUTH_SERVER_URL = "https://unaspersed-unwithstanding-journey.ngrok-free.app";
const AUTH_SERVER_URL = process.env.REACT_APP_AUTH_SERVER_URL;


function AgreementPage({ onAgreementAccept, username }) {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAccept = async () => {
    setLoading(true);
    setError('');
    try {
      await axios.post(`${AUTH_SERVER_URL}/accept-agreement`, { username });
      onAgreementAccept();
    } catch (err) {
      setError('Failed to update agreement status. Please try again.');
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="agreement-container">
      <div className="agreement-content">
        <h1>User Agreement & Disclaimer</h1>
        <p>Welcome to the SAP VM SKU Recommender. Before you proceed, please read and accept the following terms:</p>
        
        <ul>
          <li><strong>AI-Powered Recommendations:</strong> This tool uses an Artificial Intelligence (AI) model to generate recommendations. While it is trained on official documentation, AI can make mistakes, produce errors, or provide incomplete information.</li>
          
          <li><strong>Not a Substitute for Official Documentation:</strong> The recommendations provided are for guidance purposes only. They are **NOT** a substitute for official SAP and Microsoft Azure documentation.</li>
          
          <li><strong>Verification Required:</strong> You **MUST** cross-check and verify any recommendation with the latest official SAP Notes and Azure certification lists before making any decisions for development, testing, or production environments.</li>
          
          <li><strong>No Liability:</strong> The developer of this tool assumes **NO LIABILITY** for any damages, financial losses, system failures, or incorrect configurations that may result from the use of information provided by this recommender. The user is solely responsible for all final decisions.</li>
        </ul>

        <p>By clicking "I Accept and Continue", you acknowledge that you have read, understood, and agreed to these terms.</p>
        
        {error && <p className="error-message">{error}</p>}

        <button 
          className="accept-button" 
          onClick={handleAccept}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'I Accept and Continue'}
        </button>
      </div>
    </div>
  );
}

export default AgreementPage;