const express = require('express');
const trackController = require('../controllers/trackController');

const router = express.Router();

router.get('/track/:trackId', trackController.getTrackInfo);

module.exports = router;