import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Home from './components/macro/Home';
import SearchResults from './components/macro/SearchResults';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [trackInfo, setTrackInfo] = useState(null);
  const [url, setUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const { data } = await axios.post(
          'https://accounts.spotify.com/api/token',
          null,
          {
            headers: {
              Authorization: `Basic ${btoa(`${client_id}:${client_secret}`)}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            params: {
              grant_type: 'client_credentials',
            },
          }
        );
        localStorage.setItem('spotifyToken', data.access_token);
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    fetchToken();
  }, [client_id, client_secret]);

  const fetchTrackInfo = async (trackId, callback) => {
    try {
      const token = localStorage.getItem('spotifyToken');
      const trackResponse = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const trackData = await trackResponse.json();

      if (trackData.error) {
        setErrorMessage('Invalid URL. Please enter a valid song URL.');
        if (callback) callback(false);
        return;
      }

      const audioFeaturesResponse = await fetch(`https://api.spotify.com/v1/audio-features/${trackId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const audioFeaturesData = await audioFeaturesResponse.json();

      const combinedTrackInfo = { ...trackData, ...audioFeaturesData };

      setTrackInfo(combinedTrackInfo);
      setErrorMessage('');
      if (callback) callback(true);
    } catch (error) {
      console.error('Error fetching track info:', error);
      setErrorMessage('Failed to fetch track information. Please try again.');
      if (callback) callback(false);
    }
  };

  const handleSearch = (inputUrl, callback) => {
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

    setUrl(trackId);
    fetchTrackInfo(trackId, callback);
  };

  return (
    <Router basename="/not-even-in-spotify/">
      <Routes>
        <Route path="/" element={<Home handleSearch={handleSearch} errorMessage={errorMessage} />} />
        <Route path="/results" element={<SearchResults trackInfo={trackInfo} handleSearch={handleSearch} errorMessage={errorMessage} />} />
      </Routes>
    </Router>
  );
}

export default App;