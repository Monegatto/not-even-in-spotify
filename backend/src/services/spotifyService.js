const axios = require('axios');
require('dotenv').config();

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret  = process.env.SPOTIFY_CLIENT_SECRET;

let spotifyToken = '';

const fetchSpotifyToken = async () => {
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
      spotifyToken = data.access_token;
    } catch (error) {
      console.error('Error fetching Spotify token:', error.response?.data || error.message);
      throw new Error('Failed to fetch Spotify token');
    }
};
  
// Renova o token a cada 50 minutos
const refreshTokenInterval = setInterval(fetchSpotifyToken, 50 * 60 * 1000);

// Gera o token ao iniciar o servidor
fetchSpotifyToken();

const fetchTrackInfo = async (trackId) => {
    try {
      const trackResponse = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
        headers: {
          Authorization: `Bearer ${spotifyToken}`,
        },
      });
      const trackData = await trackResponse.json();

      const artistId = trackData.artists[0].id;
  
      const topTracksResponse = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks`, {
        headers: {
          Authorization: `Bearer ${spotifyToken}`,
        },
        params: {
            market: 'BR'
        },
      });
      const topTracksData = await topTracksResponse.json();
  
      return { ...trackData, ...topTracksData };
    } catch (error) {
      console.error('Error fetching track info from Spotify:', error.response?.data || error.message);
      throw new Error('Failed to fetch track information from Spotify');
    }
  };

module.exports = { fetchSpotifyToken, fetchTrackInfo };