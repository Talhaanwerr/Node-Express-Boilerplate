const express = require('express');
const { getTimeSummary } = require('../controllers/time-summary-controller');
const router = express.Router();

// Define the time summary route
router.get('/time-summary', getTimeSummary);

module.exports = router;
