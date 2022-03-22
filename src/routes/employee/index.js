const express = require('express');
const router = express.Router();
const employeeController = require('../../controllers/employee.controller');

router.post('/check-in', employeeController.checkIn);
router.put('/check-out/:id', employeeController.checkOut);
router.post('/leave', employeeController.leave);
router.get('/attendance-report', employeeController.attendanceReport);
router.get('/check-in-status', employeeController.checkInStatus);

module.exports = router;