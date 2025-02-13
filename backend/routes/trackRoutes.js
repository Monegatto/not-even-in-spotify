const express = require('express');
const { getTrackDetails } = require('../controllers/trackController');
const { getUserSearchHistory } = require('../controllers/trackController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/history', authMiddleware, getUserSearchHistory);
router.get('/:id',authMiddleware, getTrackDetails); // Middleware antes do controlador

module.exports = router;
