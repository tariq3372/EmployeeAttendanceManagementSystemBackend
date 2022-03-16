const mongoose = require('mongoose');
const { Schema } = mongoose;

const departmentSchema = new Schema({
    departmentName: String,
})

const Department = module.exports = mongoose.model('Department', departmentSchema)