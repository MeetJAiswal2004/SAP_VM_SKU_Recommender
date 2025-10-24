// // app.js

import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import axios from 'axios';
import AboutPage from './About';
import './Alertbox.css';
import './About.css';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import AgreementPage from './AgreementPage';
import AuthAlert from './AuthAlert';
// import aboutBackgroundImage from './bgimgoriginal.png';
// import mobileBackgroundImage from './mobilebg.png';

function App() {
  const [mode, setMode] = useState(null);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isShifted, setIsShifted] = useState(false);
  const [isModesMenuOpen, setModesMenuOpen] = useState(false);
  const modesMenuRef = useRef(null);
  const [currentPage, setCurrentPage] = useState('main');
  const textareaRef = useRef(null);
  const [hasResponded, setHasResponded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuthAlert, setShowAuthAlert] = useState(false);
  const cloudinaryDesktopBgUrl = "https://res.cloudinary.com/dufsu5par/image/upload/v1758370240/bgimgoriginal_edvyqi.png";
  const cloudinaryMobileBgUrl = "https://res.cloudinary.com/dufsu5par/image/upload/v1761311787/mobilebg_v1tguw.png";

  useEffect(() => {
    const loggedInUser = localStorage.getItem('currentUser');
    const loggedInStatus = localStorage.getItem('isLoggedIn');

    if (loggedInUser && loggedInStatus === 'true') {
      setIsLoggedIn(true);
      setCurrentUser(loggedInUser);
    }
  }, []);

  const handleLoginSuccess = (showAgreement, username) => {
    setIsLoggedIn(true);
    setCurrentUser(username);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', username);

    if (showAgreement) {
      setCurrentPage('agreement');
    } else {
      setCurrentPage('main');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    handleClear();
    setCurrentPage('main');
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modesMenuRef.current && !modesMenuRef.current.contains(event.target)) {
        setModesMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modesMenuRef]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleInfer = async () => {
    if (!isLoggedIn) {
      setShowAuthAlert(true);
      return;
    }

    if (loading || !query.trim()) return;
    if (!mode) {
      setErrorMessage('Please select a mode first.');
      setShowError(true);
      return;
    }
    setIsShifted(true);
    const loadingTimer = setTimeout(() => {
      setLoading(true);
    }, 300);
    setResponse('');
    setHasResponded(false);
    try {
      const mainEngineUrl = process.env.REACT_APP_MAIN_ENGINE_URL;
      const endpoint = mode === 'normal' ? `${mainEngineUrl}/infer` : `${mainEngineUrl}/infer_rag`;
      const res = await axios.post(endpoint, { query });
      setResponse(res.data.response);
    } catch (err) {
      setResponse('Error: ' + err.message);
    } finally {
      clearTimeout(loadingTimer);
      setLoading(false);
      setHasResponded(true);
    }
  };

  const handleClear = () => {
    setIsClearing(true);
    setTimeout(() => {
      setQuery('');
      setResponse('');
      setIsShifted(false);
      setMode(null);
      setHasResponded(false);
      setIsClearing(false);
    }, 300);
  };

  const selectMode = (selectedMode) => {
    setMode(selectedMode);
    setModesMenuOpen(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleInfer();
    }
  };
  const backgroundImage = windowWidth <= 768 ? cloudinaryMobileBgUrl : cloudinaryDesktopBgUrl;

  return (
    <div className="app" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <AuthAlert 
        show={showAuthAlert}
        onLoginClick={() => {
          setShowAuthAlert(false);
          setCurrentPage('login');
        }}
        onSignupClick={() => {
          setShowAuthAlert(false);
          setCurrentPage('signup');
        }}
        onClose={() => setShowAuthAlert(false)}
      />

      {(() => {
        switch (currentPage) {
            case 'login':
              return <LoginPage onBackClick={() => setCurrentPage('main')} onLoginSuccess={handleLoginSuccess} />;
            
            case 'signup':
              return <SignupPage onBackClick={() => setCurrentPage('main')} onSignupSuccess={() => setCurrentPage('login')} />;
  
            case 'about':
              return <AboutPage onBackClick={() => setCurrentPage('main')} />;
            
            case 'agreement':
              return <AgreementPage 
                          onAgreementAccept={() => setCurrentPage('main')} 
                          username={currentUser} 
                      />;
  
            default:
              return (
                <>
                  {showError && (
                    <div className="alert-overlay"><div className="alert-box"><p>{errorMessage}</p><button onClick={() => setShowError(false)}>OK</button></div></div>
                  )}
                  <header className="app-header">
                    <div className="header-top">
                      <div className="main-heading-container">
                        <h1>SAP VM SKU Recommender</h1>
                        <p className="sub-heading">Powered by <span className="highlight-green">QWEN-LLM-7B</span> and <span className="highlight-green">RAG</span></p>
                      </div>
                      <nav className="header-nav">
                        <button onClick={() => setCurrentPage('about')}>About Us</button>
                        {isLoggedIn ? (
                          <button onClick={handleLogout}>Logout</button>
                        ) : (
                          <>
                            <button onClick={() => setCurrentPage('login')}>Login</button>
                            <button onClick={() => setCurrentPage('signup')}>Signup</button>
                          </>
                        )}
                      </nav>
                    </div>
                  </header>
                  <div className={`main-content ${isShifted ? 'shifted-up' : ''}`}>
                     <div className="input-area-container">
                      <textarea
                        ref={textareaRef}
                        placeholder="Enter your query..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        rows={1}
                      />
                      <div className="input-toolbar">
                        <div className="toolbar-left">
                          <div className="modes-menu" ref={modesMenuRef}>
                            <button className="modes-menu-button" onClick={() => setModesMenuOpen(!isModesMenuOpen)}>
                              {mode ? mode.toUpperCase() : 'Modes'}
                            </button>
                            {isModesMenuOpen && (
                              <div className="modes-dropdown-content">
                                <button onClick={() => selectMode('normal')} className={mode === 'normal' ? 'active' : ''}>Normal {mode === 'normal' && '✔'}</button>
                                <button onClick={() => selectMode('rag')} className={mode === 'rag' ? 'active' : ''}>RAG {mode === 'rag' && '✔'}</button>
                              </div>
                            )}
                          </div>
                          <button className="toolbar-button clear-button" title="Clear All" onClick={handleClear}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                          </button>
                        </div>
                        <div className="toolbar-right">
                          <button className="toolbar-button submit-button" title="Submit" onClick={handleInfer} disabled={loading || !query.trim()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="results-area">
                    {loading && (
                      <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Generating response...</p>
                      </div>
                    )}
                    {hasResponded && !loading && (
                      <>
                        <div className={`response-container ${isClearing ? 'fade-out' : ''}`}>
                          <pre className="response-pre"><b>Response:</b>{response ? `\n\n${response}` : `\n\nThe model chose not to provide a response for this query.`}</pre>
                        </div>
                      </>
                    )}
                  </div>
                </>
              );
          }
      })()}
    </div>
  );
}

export default App;



