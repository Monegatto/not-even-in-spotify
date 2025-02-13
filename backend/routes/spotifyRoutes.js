const express = require('express');
const axios = require('axios');
const { getSpotifyToken } = require('../config/spotifyConfig');
const router = express.Router();

router.get('/search', async (req, res) => {
  const { query } = req.query;
  
  if (!query) {
    return res.status(400).json({ error: 'Query string is required' });
  }

  try {
    // Obtém o token do Spotify dinamicamente
    const token = await getSpotifyToken();

    const response = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: query,
        type: 'track',
        limit: 10,
      },
    });

    res.json(response.data.tracks.items);
  } catch (error) {
    console.error('Error fetching from Spotify API:', error);
    res.status(500).json({ error: 'Failed to fetch tracks' });
  }
});

module.exports = router;
