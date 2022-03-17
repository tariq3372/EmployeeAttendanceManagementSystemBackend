const { validationResult } = require('express-validator');
module.exports.check = async(req, res, next) => {
    try {
        console.log("check");
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).send({
                error: true,
                message: "Parameters Invalid"
            })
        }
        else {
            next()
        }
    }
    catch(err) {
        console.log("check internal server error", err);
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}