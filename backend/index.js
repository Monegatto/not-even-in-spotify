const express = require('express');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const cors = require('cors');
const morgan = require('morgan');
const logger = require('./utils/logger');
const dotenv = require('dotenv');
const { sequelize } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const searchRoutes = require('./routes/searchRoutes');
const spotifyRoutes = require('./routes/spotifyRoutes');
const trackRoutes = require('./routes/trackRoutes');  // Importe a rota para track
const fs = require('fs');
const http = require('http');
const https = require('https');

// Carrega variáveis de ambiente
dotenv.config();

const app = express();

// Configuração do rate limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 100, // Limita a 100 requisições por IP por minuto
  message: 'Limite de requisições excedido. Tente novamente em 1 minuto.',
  standardHeaders: true, // Retorna os headers de limitação de taxa
  legacyHeaders: false, // Desabilita os headers antigos (X-RateLimit-*),
});

app.use(limiter);
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));

// Monta as rotas
app.use('/api/auth', authRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/spotify', spotifyRoutes);
app.use('/api/track', trackRoutes);  // Aqui definimos a rota /api/track

// Carrega os certificados SSL
const privateKey = fs.readFileSync('.cert/key.pem', 'utf8');
const certificate = fs.readFileSync('.cert/cert.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

// Conectar ao banco de dados e iniciar o servidor
sequelize.authenticate()
  .then(() => {
    console.log('Conectado ao banco de dados com sucesso!');
    
    // Criando servidor HTTPS
    const httpsServer = https.createServer(credentials, app);

    // Redireciona as requisições HTTP para HTTPS
    const httpServer = http.createServer(app);
    httpServer.listen(8080, () => {
      console.log('Servidor HTTP rodando na porta 8080 (redirecionando para HTTPS)');
    });

    // Inicia o servidor HTTPS
    httpsServer.listen(process.env.PORT || 3000, () => {
      logger.info('Servidor HTTPS iniciado na porta 3000');
      console.log('Servidor HTTPS rodando na porta 3000');
    });
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });
