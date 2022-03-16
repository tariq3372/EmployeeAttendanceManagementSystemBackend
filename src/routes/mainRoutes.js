// Requiring
const admin = require('./admin')
const general = require('./general')
const { API_V1, ADMIN } = require('../constants')

module.exports = (app) => {
    app.use(`${API_V1}${ADMIN}`, admin);
    app.use(`${API_V1}`, general);
}