import './App.css';
import React, { useState } from 'react';
import Home from './components/macro/Home';
import Login from './components/macro/Login';
import SearchResults from './components/macro/SearchResults';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import History from './components/macro/History';

function App() {
  const [trackInfo, setTrackInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const handleLogin = (loginToken, spotifyToken) => {
    // Armazenar o token de login no localStorage
    localStorage.setItem('token', loginToken);
    
    // Armazenar o token do Spotify no sessionStorage
    sessionStorage.setItem('spotifyToken', spotifyToken);
    
    setToken(loginToken);
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

    const spotifyToken = sessionStorage.getItem('spotifyToken'); // Pega o token do Spotify

    if (!spotifyToken) {
      setErrorMessage('Spotify token is missing. Please log in again.');
      if (callback) callback(false);
      return;
    }

    try {
      const response = await fetch(`https://localhost:3000/api/track/${trackId}`, {
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
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;
