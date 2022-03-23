const DutyDuration = require('../models/dutyDuration.model');
const Employee = require('../models/employee.model');
const Leave = require('../models/leave.model');
const AttendanceReport = require('../models/attendanceReport.model');
const { PER_DAY_EXTRA_COST, PER_MIN_COST } = require('../constants');
const { default: mongoose } = require('mongoose');

module.exports. checkIn = async(req, res) => {
    try {
        const { id } = req.body;
        const employee = await Employee.findOne({ id }, { jobTitleId: 1 });
        const data = { 
            "employeeId": id,
            "jobId": employee.jobTitleId,
            "date": new Date()
        }
        const result = await DutyDuration.create(data);
        if(result) {
            return res.status(200).send({
                "success": true,
                result
            })
        }
        else {
            return res.status(400).send({
                "success": false,
                result: null
            })
        }
    }
    catch(err) {
        console.log("checkIn internal error", err);
        return res.status(500).send({
            error: true,
            message: "Internal server error"
        })
    }
}

module.exports.checkOut = async(req, res) => {
    try {
        console.log("checkOut");
        const checkoutTime = new Date()
        const { id } = req.params;
        const duty = await DutyDuration.findOne({ employeeId: id, duration: { $exists: false } });
        const milisecond = checkoutTime - duty.date;
        // working hrs in min 
        const min = Math.floor((milisecond % 86400000)/60000);
        const result = await DutyDuration.findOneAndUpdate({employeeId: id, duration: { $exists: false } }, { duration: min })
        const totalLabor = PER_MIN_COST * min
        const data = {
            employeeId: duty.employeeId,
            jobId: duty.jobId,
            dutyId: duty._id,
            totalLabor: totalLabor,
            salary: totalLabor + PER_DAY_EXTRA_COST,
            date: new Date()
        }
        const attendanceReport = await AttendanceReport.create(data);
        return res.status(200).send({
            success: true
        })
    }
    catch(err) {
        console.log("checkOut internal server error", err);
        return res.status(500).send({
            error: true,
            message: "Internal server error"
        })
    }
}

module.exports.leave = async(req, res) => {
    try {
        console.log("leave");
        const { id } = req.body;
        const employee = await Employee.findOne({ id }, { jobTitleId: 1 });
        var data = {
            "employeeId": id,
            "jobId": employee.jobTitleId,
            "date": new Date()
        }
        const leave = await Leave.create(data);
        data = {
            "employeeId": id,
            "jobId": employee.jobTitleId,
            "leaveId": leave.id,
            "totalLabor": 0, // In case of leave it's 00
            "salary": PER_DAY_EXTRA_COST,
            "date": new Date()
        } 
        const attendanceReport = await AttendanceReport.create(data);
        return res.status(200).send({
            success: true,
        })
    }
    catch(err) {
        console.log("leave internal server error", err);
        return res.status(500).send({
            error: true,
            message: "Internal server error"
        })
    }
}

module.exports.checkInStatus = async(req, res) => {
    try {
        const { id } = req.query;
        const isDurationExist = await DutyDuration.findOne({ employeeId: id, duration: { $exists: false } });
        return res.status(200).send({
            isDurationExist: isDurationExist? false: true
        })
    } catch(err) {
        console.log("checkInStatus internal server error", err);
        return res.status(500).send({
            error: true,
            message: "Internal server error"
        })
    }
}

module.exports.attendanceReport = async(req, res) => {
    try {
        const { _id } = req.query;
        const totalLeaves = await Leave.countDocuments({ employeeId: _id });
        const totalSalary = await AttendanceReport.aggregate([
            {
                $match: {
                    employeeId: mongoose.Types.ObjectId(_id)
                }
            },
            {
                $group: {
                    _id: null,
                    salary: { $sum: "$salary" }
                }
            }
        ])
        const totalWorkingMinutes = await DutyDuration.aggregate([
            {
                $match: {
                    employeeId: mongoose.Types.ObjectId(_id)
                }
            },
            {
                $group: {
                    _id: null,
                    workingMinutes: { $sum: "$duration" }
                }
            }
        ])

        return res.status(200).send({
            totalLeaves,
            totalSalary: totalSalary[0].salary,
            totalWorkingMinutes: totalWorkingMinutes[0].workingMinutes
        })
    }
    catch (err) {
        console.log("getAttendanceReport internal server error", err);
        return res.status(500).send({
            error: true,
            message: "Internal server error",
        })
    }
}