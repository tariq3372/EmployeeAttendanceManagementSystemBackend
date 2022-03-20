const express = require('express');
const router = express.Router();
const generalController = require('../../controllers/general.controller');
const validation = require('../../middlewares/validation.middleware');
const { check } = require('../../middlewares/check.middleware');

router.post('/login', validation.validateLoginApi, check, generalController.login);
module.exports = router;