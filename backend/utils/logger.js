const winston = require('winston');

// Definindo os níveis de log
const logLevels = {
  levels: {
    info: 0,
    warn: 1,
    error: 2,
  },
  colors: {
    info: 'blue',
    warn: 'yellow',
    error: 'red',
  },
};

// Criando o logger
const logger = winston.createLogger({
  levels: logLevels.levels,
  transports: [
    // Log para console
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    // Log para arquivo (opcional)
    new winston.transports.File({
      filename: 'logs/app.log',
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  ],
});

module.exports = logger;
