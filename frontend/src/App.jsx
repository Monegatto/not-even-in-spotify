import './App.css';
import React, { useState } from 'react';
import Home from './components/macro/Home';
import Login from './components/macro/Login';
import SearchResults from './components/macro/SearchResults';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [trackInfo, setTrackInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  const handleSearch = async (inputUrl, callback) => {
    setErrorMessage('');

    if (!inputUrl) {
      setErrorMessage('Please enter a song URL.');
      if (callback) callback(false);
      return;
    }

    const trackId = inputUrl.split('/').pop().split('?')[0];
    if (!trackId) {
      setErrorMessage('Invalid URL. Please enter a valid song URL.');
      if (callback) callback(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/track/${trackId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch track information');
      }

      const trackData = await response.json();
      setTrackInfo(trackData);
      setErrorMessage('');
      if (callback) callback(true);
    } catch (error) {
      console.error('Error fetching track info:', error);
      setErrorMessage('Failed to fetch track information. Please try again.');
      if (callback) callback(false);
    }
  };

  return (
    <Router basename="/not-even-in-spotify/">
      <Routes>
        <Route path="/" element={token ? <Home handleSearch={handleSearch} errorMessage={errorMessage} /> : <Login onLogin={handleLogin} />} />
        <Route path="/results" element={token ? <SearchResults trackInfo={trackInfo} handleSearch={handleSearch} errorMessage={errorMessage} /> : <Login onLogin={handleLogin} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
      </Routes>
    </Router>
  );
}

export default App;