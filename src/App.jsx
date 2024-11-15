import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Home from './components/macro/Home';

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

  const fetchTrackInfo = async () => {
    try {
      const trackId = url.split('/').pop().split('?')[0];
      const response = await axios.get(
        `https://api.spotify.com/v1/tracks/${trackId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('spotifyToken')}`,
          },
        }
      );
      const data = response.data;
      setTrackInfo(data);
      localStorage.setItem('savedTrackInfo', JSON.stringify(data));
    } catch (error) {
      console.error('Error fetching track info:', error);
    }
  };

  const handleSearch = (inputUrl) => {
    setUrl(inputUrl);
    fetchTrackInfo();
  };

  return (
    <div className="App">
      <Home handleSearch={handleSearch} />
      {trackInfo && (
        <div>
          <h2>Track Information:</h2>
          <p><strong>Name:</strong> {trackInfo.name}</p>
          <p><strong>Artist:</strong> {trackInfo.artists.map((artist) => artist.name).join(', ')}</p>
          <p><strong>Album:</strong> {trackInfo.album.name}</p>
        </div>
      )}
    </div>
  );
}

export default App;
