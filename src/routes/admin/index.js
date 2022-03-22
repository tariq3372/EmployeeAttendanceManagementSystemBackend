const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/admin.controller');
const { authenticateToken } = require('../../middlewares/authorization.middleware');
const validation = require('../../middlewares/validation.middleware');
const { check } = require('../../middlewares/check.middleware');

// Admin End Points
router.post('/', validation.validateAddAdminApi, check, adminController.addAdmin);

// Department End Points
router.post('/department', authenticateToken, validation.validateAddDepartmentApi, check, adminController.addDepartment);
router.get('/department', authenticateToken, validation.validateGetDepartmentApi, check, adminController.getDepartment);
router.delete('/department/:id', authenticateToken, validation.validateDeleteDepartmentApi, check, adminController.deleteDepartment);
router.put('/department/:id', authenticateToken, validation.validateUpdateDepartmentApi, check, adminController.updateDepartment);
router.get('/department-list', adminController.getDepartmentList);

// Job Title End Points
router.post('/job-title', authenticateToken,  adminController.addJobTitle);
router.get('/job-title', authenticateToken, validation.validateGetJobTitleApi, check, adminController.getJobTitle);
router.delete('/job-title/:id', authenticateToken, validation.validateDeleteJobTitleApi, check, adminController.deleteJobTitle);
router.put('/job-title/:id', authenticateToken, validation.validateUpdateJobTitleApi, check, adminController.updateJobTitle);
router.get('/job-title/department-id', adminController.getJobTitleByDepartmentId)

// Employee End Points
router.post('/employee', authenticateToken, adminController.addEmployee);
router.get('/employee', authenticateToken, validation.validateGetEmployeeApi, check, adminController.getEmployee);
router.delete('/employee/:id', authenticateToken, validation.validateDeleteEmployeeApi, check,  adminController.deleteEmployee);
router.put('/employee/:id', authenticateToken, validation.validateUpdateEmployeeApi, check, adminController.updateEmployee);

// General End Points
router.get('/dashboard-count', authenticateToken, adminController.getDashboardCount);

// Reports End Points
router.get('/attendance-report',  adminController.getAttendanceReport)

module.exports = router;