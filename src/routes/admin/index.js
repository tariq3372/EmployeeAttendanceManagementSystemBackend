const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/admin.controller');
const { authenticateToken } = require('../../middlewares/authorization.middleware');

router.post('/', adminController.addAdmin);
// Department End Points
router.post('/department', authenticateToken, adminController.addDepartment);
router.get('/department', authenticateToken, adminController.getDepartment);
router.delete('/department/:id', authenticateToken, adminController.deleteDepartment);
router.put('/department/:id', authenticateToken, adminController.updateDepartment);
// Job Title End Points
router.post('/job-title', authenticateToken,  adminController.addJobTitle);
router.get('/job-title', authenticateToken, adminController.getJobTitle);
router.delete('/job-title/:id', authenticateToken, adminController.deleteJobTitle);
router.put('/job-title/:id', authenticateToken, adminController.updateJobTitle);
// Employee End Points
router.post('/employee', authenticateToken, adminController.addEmployee);
router.get('/employee', authenticateToken, adminController.getEmployee);
router.delete('/employee/:id', authenticateToken, adminController.deleteEmployee);
router.put('/employee/:id', authenticateToken, adminController.updateEmployee);

module.exports = router;