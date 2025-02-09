const express = require('express');
const cors = require('cors');
const trackRoutes = require('./routes/trackRoute');
const { fetchSpotifyToken } = require('./services/spotifyService');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true,
}));
app.use(express.json());

// Rotas
app.use('/api', trackRoutes);

// Buscar token do Spotify
fetchSpotifyToken();

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});