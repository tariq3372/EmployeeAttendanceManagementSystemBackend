const mongoose = require('mongoose');
const { Schema } = mongoose;

const leaveSchema = new Schema({
    employeeId: { type: Schema.Types.ObjectId, ref: 'Employee' },
    jobId: { type: Schema.Types.ObjectId, ref: 'JobTitle' },
    date: Date
})

const Leave = module.exports = mongoose.model('Leave', leaveSchema)