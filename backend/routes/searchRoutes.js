const express = require('express');
const { searchMusic } = require('../controllers/searchController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, searchMusic);

module.exports = router;
