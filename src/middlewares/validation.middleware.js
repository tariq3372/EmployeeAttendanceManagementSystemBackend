// Requiring
const { check } = require('express-validator');

const EMAIL = check('email').notEmpty().exists().trim().isEmail().withMessage("Wrong Email");
const PASSWORD = check('password').notEmpty().exists().trim().isLength({ min: 6 }).withMessage("Wrong Password");
const TYPE = check('type').notEmpty().exists().trim().isIn(['ADMIN','EMPLOYEE']).withMessage("Wrong Type");

module.exports.validateLoginApi = [
    EMAIL,
    PASSWORD,
    TYPE
]