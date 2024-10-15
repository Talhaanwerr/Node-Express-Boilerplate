// router/leaveRoutes.js

const express = require('express');
const { applyLeave, getLeaves } = require('../controllers/leaveController');
const router = express.Router();

router.post('/apply', applyLeave); // Endpoint to apply leave
router.get('/leaves', getLeaves); // Endpoint to fetch leaves

module.exports = router;