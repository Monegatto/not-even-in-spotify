const axios = require('axios');
const { getSpotifyToken } = require('../config/spotifyConfig');
const { SearchHistory } = require('../models');
const user = require('../models/user');

exports.getTrackDetails = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: 'Track ID é obrigatório' });

  try {
    console.log('Obtendo token do Spotify...');
    const token = await getSpotifyToken();
    console.log('Token obtido!');

    const response = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('Usuário autenticado:', req.user);
    console.log('Usuário que realizou a busca:', req.user?.id);

    try {
      const newSearch = await SearchHistory.create({
        trackName: response.data.name,
        albumName: response.data.album.name,
        artistName: response.data.artists.map((artist) => artist.name).join(', '),
        userId: req.user.id,
      });
      console.log('Histórico salvo com sucesso:', newSearch);
    } catch (dbError) {
      console.error('Erro ao salvar no banco:', dbError);
    }

    res.json(response.data);
  } catch (error) {
    console.error('Erro ao buscar track:', error.response?.data || error.message);
    res.status(500).json({ error: 'Erro ao buscar informações da track' });
  }
};

exports.getUserSearchHistory = async (req, res) => {
  try {
    console.log("Usuário autenticado:", req.user);

    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Usuário não autenticado." });
    }

    // Buscar o histórico de busca para o usuário logado
    const history = await SearchHistory.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']], // Ordenar do mais recente para o mais antigo
    });

    if (!history.length) {
      return res.status(404).json({ message: "Nenhum histórico encontrado." });
    }

    res.json(history);
  } catch (error) {
    console.error("Erro ao buscar histórico:", error);
    res.status(500).json({ error: "Erro ao buscar histórico de buscas." });
  }
};
