const express = require('express');
const router = express.Router();
const employeeController = require('../../controllers/employee.controller');
const { authenticateToken } = require('../../middlewares/authorization.middleware');
const validation = require('../../middlewares/validation.middleware');
const { check } = require('../../middlewares/check.middleware');

router.post('/check-in', authenticateToken, employeeController.checkIn);
router.put('/check-out/:id', authenticateToken, employeeController.checkOut);
router.post('/leave', authenticateToken,  employeeController.leave);
router.get('/check-in-status', authenticateToken, employeeController.checkInStatus);
router.get('/attendance-report', authenticateToken, employeeController.attendanceReport);
router.post('/leave-request', authenticateToken, check, validation.validateLeaveRequestApi, employeeController.leaveRequest);

module.exports = router;