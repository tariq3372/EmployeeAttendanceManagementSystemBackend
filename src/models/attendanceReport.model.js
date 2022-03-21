const mongoose = require('mongoose');
const { Schema } = mongoose;

const attendanceReportSchema = new Schema({
    employeeId: { type: Schema.Types.ObjectId, ref: 'Employee' },
    jobId: { type: Schema.Types.ObjectId, ref: 'JobTitle' },
    dutyId: { type: Schema.Types.ObjectId, ref: 'DutyDuration' },
    leaveId: { type: Schema.Types.ObjectId, ref: 'Leave' },
    totalLabor: Number,
    salary: Number,
    date: Date
})

const AttendanceReport = module.exports = mongoose.model('AttendanceReport', attendanceReportSchema)