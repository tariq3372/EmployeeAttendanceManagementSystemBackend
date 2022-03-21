// Requiring
const admin = require('./admin')
const general = require('./general')
const employee = require('./employee')
const { API_V1, ADMIN, EMPLOYEE } = require('../constants')

module.exports = (app) => {
    app.use(`${API_V1}${ADMIN}`, admin);
    app.use(`${API_V1}`, general);
    app.use(`${API_V1}${EMPLOYEE}`, employee);
}