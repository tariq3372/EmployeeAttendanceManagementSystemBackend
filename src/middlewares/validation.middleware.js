// Requiring
const { check } = require('express-validator');
const { FEMALE, MALE } = require('../constants');

const EMAIL = check('email').notEmpty().exists().trim().isEmail().withMessage("Wrong Email");
const PASSWORD = check('password').notEmpty().exists().trim().isLength({ min: 6 }).withMessage("Wrong Password");
const TYPE = check('type').notEmpty().exists().trim().isIn(['ADMIN','EMPLOYEE']).withMessage("Wrong Type");
const DEPARTMENT_NAME = check('departmentName').notEmpty().exists().trim().withMessage("Wrong Department Name");
const ID = check('id').notEmpty().exists().trim().isMongoId().withMessage("Wrong ID");
const JOB_TITLE = check('jobTitle').notEmpty().exists().trim().withMessage("Wrong Job Title");
const F_NAME = check('fName').optional().notEmpty().exists().trim().withMessage("Wrong Name");
const L_NAME = check('lName').optional().notEmpty().exists().trim().withMessage("Wrong Name");
const GENDER = check('gender').optional().notEmpty().exists().trim().isIn([ FEMALE, MALE ]).withMessage("Wrong Gender");
const _ID = check('_id').notEmpty().exists().trim().isMongoId().withMessage("Wrong ID");

module.exports.validateLoginApi = [
    EMAIL,
    PASSWORD,
    TYPE
]
module.exports.validateAddAdminApi = [
    EMAIL,
    PASSWORD,
]
module.exports.validateAddDepartmentApi = [
    DEPARTMENT_NAME
]
module.exports.validateDeleteEmployeeApi = [
    ID
]
module.exports.validateDeleteJobTitleApi = [
    ID
]
module.exports.validateDeleteDepartmentApi = [
    ID
]
module.exports.validateUpdateDepartmentApi = [
    ID,
    DEPARTMENT_NAME
]
module.exports.validateUpdateJobTitleApi = [
    ID,
    JOB_TITLE
]
module.exports.validateUpdateEmployeeApi = [
    ID,
    F_NAME,
    L_NAME,
    GENDER
]
module.exports.validateLeaveRequestApi = [
    _ID
]