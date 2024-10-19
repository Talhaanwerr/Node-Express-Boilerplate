const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/Attendance-by-idController');


router.get('/attendance/:id', attendanceController.getAttendanceById);

module.exports = router;