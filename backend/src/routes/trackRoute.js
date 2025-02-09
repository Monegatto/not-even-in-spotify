const express = require('express');
const trackController = require('../controllers/trackController');
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();

router.get('/track/:trackId', authenticateToken, trackController.getTrackInfo);

module.exports = router;