const mongoose = require('mongoose');
const { Schema } = mongoose;
const { FEMALE, MALE } = require('../constants');

const EmployeeSchema = new Schema({
    fName: String,
    lName: String,
    gender: { type: String, enum: [ FEMALE, MALE ] },
    age: String,
    contactAdd: String,
    email: String,
    password: String,
    token: String,
    jobTitleId: { type: Schema.Types.ObjectId, ref: 'JobTitle' }
})

const Employee = module.exports = mongoose.model('Employee', EmployeeSchema)