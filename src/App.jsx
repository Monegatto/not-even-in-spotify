import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Home from './components/macro/Home';
import SearchResults from './components/macro/SearchResults';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  const [trackInfo, setTrackInfo] = useState(null);
  const [url, setUrl] = useState('');
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

  const fetchTrackInfo = async (trackId) => {
    try {
      const token = localStorage.getItem('spotifyToken');
      const trackResponse = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const trackData = await trackResponse.json();

      const audioFeaturesResponse = await fetch(`https://api.spotify.com/v1/audio-features/${trackId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const audioFeaturesData = await audioFeaturesResponse.json();

      const combinedTrackInfo = { ...trackData, ...audioFeaturesData };

      setTrackInfo(combinedTrackInfo);
    } catch (error) {
      console.error('Error fetching track info:', error);
    }
  };

  const handleSearch = (inputUrl) => {
    const trackId = inputUrl.split('/').pop().split('?')[0];
    setUrl(trackId);
    fetchTrackInfo(trackId);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home handleSearch={handleSearch} />} />
        <Route path="/results" element={<SearchResults trackInfo={trackInfo} handleSearch={handleSearch} />} />
      </Routes>
    </Router>
  );
}

export default App;