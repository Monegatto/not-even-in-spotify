const express = require('express');
const router = express.Router();
const neisController = require('../controllers/neisController');

// Rota para buscar informações da música
router.get('/tracks/:trackId',  neisController.handleSearch);

module.exports = router;