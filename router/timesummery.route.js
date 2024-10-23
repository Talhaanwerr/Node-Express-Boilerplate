const express = require('express');
const { getTimeSummary } = require('../controllers/Time-SummaryController');

const router = express.Router();


router.get('/time-summary', getTimeSummary);

module.exports = router;