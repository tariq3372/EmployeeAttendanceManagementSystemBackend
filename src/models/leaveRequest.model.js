const mongoose = require('mongoose');
const { Schema } = mongoose;
const { CREATED, APPROVED, REJECTED } = require('../constants');

const leaveRequestSchema = new Schema({
    employeeId: { type: Schema.Types.ObjectId, ref: 'Employee' },
    status: { type: String, enum: [ CREATED, APPROVED, REJECTED] },
    createdAt: Date,
    modifiedAt: Date
})

const LeaveRequest = module.exports = mongoose.model('LeaveRequest', leaveRequestSchema)