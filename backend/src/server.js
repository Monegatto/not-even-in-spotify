const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const trackRoutes = require('./routes/trackRoute');
const authRoutes = require('./routes/authRoutes');
const { fetchSpotifyToken } = require('./services/spotifyService');
const bodyParser = require('body-parser');
const logger = require('./utils/logger');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Limitar requisições
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true,
}));
app.use(express.json());
app.use(bodyParser.json());

// Rotas
app.use('/api', trackRoutes);
app.use('/auth', authRoutes);

// Limitar requisições
app.use(limiter);

// Buscar token do Spotify
fetchSpotifyToken();

// Iniciar servidor
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});