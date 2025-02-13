const axios = require('axios');

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
let cachedToken = null;
let tokenExpiration = 0;

async function getSpotifyToken() {
  const currentTime = Date.now();
  
  if (cachedToken && currentTime < tokenExpiration) {
    return cachedToken;
  }

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({ grant_type: 'client_credentials' }).toString(),
      {
        headers: {
          Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    cachedToken = response.data.access_token;
    tokenExpiration = currentTime + response.data.expires_in * 1000;
    
    
    return cachedToken;
  } catch (error) {
    console.error('Erro ao obter token do Spotify:', error.response?.data || error.message);
    throw new Error('Não foi possível obter o token do Spotify.');
  }
}

module.exports = { getSpotifyToken };
