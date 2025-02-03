const axios = require('axios');

const fetchTrackInfo = async (trackId, token) => {
  try {
    // Busca informações da música
    const trackResponse = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Busca informações de áudio da música
    const audioFeaturesResponse = await axios.get(`https://api.spotify.com/v1/audio-features/${trackId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Combina os dados
    const combinedTrackInfo = {
      ...trackResponse.data,
      ...audioFeaturesResponse.data,
    };

    return combinedTrackInfo;
  } catch (error) {
    console.error('Error fetching track info:', error);
    throw new Error('Failed to fetch track information from Spotify.');
  }
};

const handleSearch = async (req, res) => {
  const { trackId } = req.params;
  const token = req.headers.authorization?.split(' ')[1]; // Extrai o token do header

  if (!trackId) {
    return res.status(400).json({ error: 'Track ID is required.' });
  }

  if (!token) {
    return res.status(401).json({ error: 'Authorization token is required.' });
  }

  try {
    const trackInfo = await fetchTrackInfo(trackId, token);
    res.status(200).json(trackInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  handleSearch,
};