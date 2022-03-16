const jwt = require('jsonwebtoken');
const { TOKEN_KEY } = require('../constants')
module.exports.authenticateToken = async (req, res, next) => {
    try {
        console.log("authenticateToken");
        const authToken = req.headers.authorization;
        const token = authToken && authToken.split(' ')[1];
        if (token) {
            console.log("token");
            jwt.verify(token, TOKEN_KEY, (err, result) => {
                if (err) {
                    console.log("token error", err)
                    return res.status(403).send({
                        authorization: false,
                        message: "Not Authorized"
                    })
                }
                else {
                    next()
                }
            })
        }
        else {
            return res.status(403).send({
                authorization: false,
                message: "Not Authorized"
            })
        }
    }
    catch (err) {
        console.log("authenticateToken middleware internal server error", err);
        return res.status(500).send({
            error: true,
            message: "Internal server error"
        })
    }
}