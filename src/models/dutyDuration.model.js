const mongoose = require('mongoose');
const { Schema } = mongoose;

const dutyDurationSchema = new Schema({
    employeeId: { type: Schema.Types.ObjectId, ref: 'Employee' },
    jobId: { type: Schema.Types.ObjectId, ref: 'JobTitle' },
    duration: Number, // in minutes
    date: Date
})

const DutyDuration = module.exports = mongoose.model('DutyDuration', dutyDurationSchema)