// Requiring 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin.model');
const Employee = require('../models/employee.model');
const { TOKEN_KEY } = require('../constants');
const ADMIN = "ADMIN";

module.exports.login = async(req, res) => {
    try {
        console.log("adminAogin");
        const { email, password, type } = req.body;
        let result;
        if(type === ADMIN) {
            result = await Admin.findOne({ email });
        }
        else {
            result = await Employee.findOne({ email });
        }
        if(result) {
            // Comparing the hash password and non hash password
            const token = jwt.sign({ email: result.email }, TOKEN_KEY, { expiresIn: '2h' });
            const isValidPassword = await bcrypt.compare(password, result.password);
            if(isValidPassword) {
                result.token = token
                await result.save()
                result.password = null // For Security reasons
                return res.status(200).send({
                    success: true,
                    message: "User Is Authorized",
                    result
                })
            }
        }
        else {
            return res.status(200).send({
                success: false,
                message: "User Does Not Exist",
                result: null
            })
        }
    }
    catch(err) {
        console.log("adminAogin internal server error", err);
        return res.status(500).send({
            error: true,
            message: "Internal server error"
        })
    }
}