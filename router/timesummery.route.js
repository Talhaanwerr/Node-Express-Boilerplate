const express = require('express');
const { getTimeSummary } = require('../controllers/timeSummaryController');

const router = express.Router();


router.get('/time-summary', getTimeSummary);

module.exports = router;