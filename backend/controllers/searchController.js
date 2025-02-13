const axios = require('axios');
const { getSpotifyToken } = require('../config/spotifyConfig');
const { SearchHistory } = require('../models');

exports.searchMusic = async (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(400).json({ error: 'Query is required' });

  try {
    const token = await getSpotifyToken();
    const response = await axios.get('https://api.spotify.com/v1/search', {
      headers: { Authorization: `Bearer ${token}` },
      params: { q: query, type: 'track', limit: 1 }
    });

    if (!response.data.tracks.items.length) {
      return res.status(404).json({ error: 'No tracks found' });
    }

    const track = response.data.tracks.items[0];
    
    // Save search details to database
    await SearchHistory.create({
      trackName: track.name,
      albumName: track.album.name,
      artistName: track.artists.map((artist) => artist.name).join(', '),
      userId: req.user.id, // Relacionando o histórico ao usuário
    });
    
    res.json(track);
  } catch (error) {
    console.error('Search error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Error fetching music data' });
  }
  
};
