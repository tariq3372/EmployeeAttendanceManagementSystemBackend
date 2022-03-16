const express = require('express');
const router = express.Router();
const generalController = require('../../controllers/general.controller');

router.post('/login', generalController.login);

module.exports = router;