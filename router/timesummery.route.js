const express = require('express');
const { getTimeSummary } = require('../controllers/Time-SummaryController');
const timesummaryRoutes = require('./timesmmary.route.js');

const router = express.Router();


router.get('/time-summary', getTimeSummary);

module.exports = router;