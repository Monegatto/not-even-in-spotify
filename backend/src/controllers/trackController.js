const { fetchTrackInfo } = require('../services/spotifyService');

const getTrackInfo = async (req, res) => {
  const { trackId } = req.params;

  try {
    const trackInfo = await fetchTrackInfo(trackId);
    res.json(trackInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getTrackInfo };