const express = require('express');
const router = express.Router();
const employeeController = require('../../controllers/employee.controller');
const { authenticateToken } = require('../../middlewares/authorization.middleware');

router.post('/check-in', authenticateToken, employeeController.checkIn);
router.put('/check-out/:id', authenticateToken, employeeController.checkOut);
router.post('/leave', authenticateToken,  employeeController.leave);
router.get('/check-in-status', authenticateToken, employeeController.checkInStatus);
router.get('/attendance-report', authenticateToken, employeeController.attendanceReport);

module.exports = router;