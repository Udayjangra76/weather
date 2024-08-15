const express = require('express');
const router = express.Router();
const { getWeatherData, getStoredWeatherData } = require('../controllers/weatherController');
const { calculateDailySummary } = require('../controllers/summaryController');
// Route to fetch and store weather data
router.get('/fetch', getWeatherData);

// Route to retrieve stored weather data
router.get('/stored', getStoredWeatherData);

router.get('/summaries', calculateDailySummary);

module.exports = router;
