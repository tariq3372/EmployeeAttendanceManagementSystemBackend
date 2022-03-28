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
// Report End Points
router.get('/attendance-report', authenticateToken, employeeController.attendanceReport);
// Leave Request End Points
router.post('/leave-request', authenticateToken, check, validation.validateLeaveRequestApi, employeeController.leaveRequest);
router.get('/leave-request', authenticateToken, employeeController.getLeaveRequest);
module.exports = router;