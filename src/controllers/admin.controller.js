const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const Admin = require('../models/admin.model');
const Department = require('../models/department.model');
const JobTitle = require('../models/jobTitle.model');
const Employee = require('../models/employee.model');
const LeaveRequest = require('../models/leaveRequest.model');
const Leave = require('../models/leave.model');
const AttendanceReport = require('../models/attendanceReport.model');
const { TOKEN_KEY } = process.env;
const ADMIN = 'ADMIN';
const { CREATED, APPROVED, PER_DAY_EXTRA_COST } = require('../constants');

module.exports.addAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const salt = await bcrypt.genSalt(6);
        const hash = await bcrypt.hash(password, salt);
        const token = jwt.sign({ email: email, role: ADMIN }, TOKEN_KEY, { expiresIn: '2h' });
        const result = await Admin.create({ email, password: hash, token });
        if (result) {
            return res.status(200).send({
                success: true,
                message: "Data Added successfully"
            });
        }
        else {
            return res.status(400).send({
                success: false,
                message: "Data Is Not Added"
            });
        }
    }
    catch (err) {
        console.log("getAdmin catch error", err);
        return res.status(500).send({
            error: true,
            message: "Internal server error"
        })
    }
}

module.exports.addDepartment = async (req, res) => {
    try {
        const { departmentName } = req.body
        const result = await Department.findOneAndUpdate({ departmentName }, { departmentName }, { new: true, upsert: true })
        if (result) {
            return res.status(200).send({
                success: true,
                message: "Department is added successfully"
            })
        }
        else {
            return res.status(400).send({
                success: false,
                message: "Department is not added"
            })
        }
    }
    catch (err) {
        console.log("addDepartment internal server error", err)
        return res.status(500).send({
            error: true,
            message: "Internal server error"
        })
    }
}

module.exports.getDepartment = async (req, res) => {
    try {
        const totalDocs = await Department.countDocuments();
        const result = await Department.find()
        if (result.length) {
            return res.status(200).send({
                success: true,
                message: 'Data Found',
                totalDocs,
                result
            })
        }
        else {
            return res.status(200).send({
                success: false,
                message: "No Data Found",
                totalDocs: 0,
                result: []
            })
        }
    } catch (err) {
        console.log("getDepartment internal server error", err);
        return res.status(500).send({
            error: true,
            message: "Internal server error"
        })
    }
}

module.exports.getDepartmentList = async (req, res) => {
    try {
        const result = await Department.find();
        return res.status(200).send({
            success: true,
            result
        })
    }
    catch (err) {
        console.log("getDepartmentList internal server error", err);
        return res.status(500).send({
            error: true,
            message: "Internal server error"
        })
    }
}

module.exports.deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await JobTitle.find({ deptId: id });
        if (result && result.length) {
            return res.status(405).send({
                success: true,
                message: "Department cannot be deleted",
            })
        }
        else {
            const deleteDepartment = await Department.deleteOne({ _id: id });
            if (deleteDepartment && deleteDepartment.deletedCount === 1) {
                return res.status(200).send({
                    success: true,
                    message: "Department deleted successfully"
                })
            }
            else {
                return res.status(400).send({
                    success: false,
                    message: "No data found"
                })
            }
        }
    }
    catch (err) {
        console.log("deleteDepartment internal server error", err);
        return res.status(500).send({
            error: true,
            message: "Internal server error"
        })
    }
}

module.exports.updateDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const { departmentName } = req.body;
        const result = await Department.findOneAndUpdate({ _id: id }, { departmentName }, { new: true });
        if (result) {
            return res.status(200).send({
                success: true,
                message: "Department updated successfully",
                result
            })
        }
        else {
            return res.status(400).send({
                success: false,
                message: "No data found",
            })
        }
    }
    catch (err) {
        console.log("updateDepartment internal server error", err)
        return res.status(500).send({
            error: true,
            message: "Internal server error"
        })
    }
}

module.exports.addJobTitle = async (req, res) => {
    try {
        const { jobTitle, deptId } = req.body;
        const result = await JobTitle.findOneAndUpdate({ jobTitle, deptId }, { jobTitle, deptId }, { new: true, upsert: true });
        if (result) {
            return res.status(200).send({
                success: true,
                message: "Job Title Add successfully"
            })
        }
        else {
            return res.status(400).send({
                success: false,
                message: "Job Title Is Not Added"
            })
        }
    }
    catch (err) {
        console.log("addJobTitle internal server error", err);
        return res.status(500).send({
            error: true,
            message: "Internal server error"
        })
    }
}

module.exports.getJobTitle = async (req, res) => {
    try {
        const totalDocs = await JobTitle.countDocuments();
        const result = await JobTitle.find();
        if (result.length) {
            return res.status(200).send({
                success: true,
                message: "Data found",
                totalDocs,
                result,
            })
        }
        else {
            return res.status(200).send({
                success: false,
                message: "No data found",
                totalDocs: 0,
                result: []
            })
        }
    }
    catch (err) {
        console.log("getJobTitle internal server error", err);
        return res.status(500).send({
            error: true,
            message: "Internal server error"
        })
    }
}

module.exports.deleteJobTitle = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Employee.find({ jobTitleId: id })
        if (result && result.length) {
            return res.status(405).send({
                success: false,
                errorCode: "405",
                message: "Job title cannot be deleted"
            })
        }
        else {
            const deleteJob = await JobTitle.deleteOne({ _id: id });
            if (deleteJob && deleteJob.deletedCount === 1) {
                return res.status(200).send({
                    success: true,
                    message: "Job title is deleted successfully"
                })
            }
            else {
                return res.status(400).send({
                    success: false,
                    message: "No data found"
                })
            }
        }
    }
    catch (err) {
        console.log("deleteJob internal server error", err);
        return res.status(500).send({
            error: true,
            message: "Internal server error"
        })
    }
}

module.exports.updateJobTitle = async (req, res) => {
    try {
        const { id } = req.params;
        const { jobTitle } = req.body;
        const result = await JobTitle.findOneAndUpdate({ _id: id }, { jobTitle }, { new: true });
        if (result) {
            return res.status(200).send({
                success: true,
                message: "Job Title updated successfully",
                result
            })
        }
        else {
            return res.status(400).send({
                success: false,
                message: "No data found"
            })
        }
    }
    catch (err) {
        console.log("updateJobTitle internal server error", err);
        return res.status(500).send({
            error: true,
            message: "Internal server error"
        })
    }
}

module.exports.getJobTitleByDepartmentId = async (req, res) => {
    try {
        const { departmentId } = req.query
        const result = await JobTitle.find({ deptId: departmentId });
        if (result) {
            return res.status(200).send({
                success: true,
                message: "Job Title found",
                result
            })
        }
        else {
            return res.status(200).send({
                success: false,
                message: "Job Title not found",
                result: null
            })
        }
    }
    catch (err) {
        console.log("getJobTitleByDepartmentId internal server error", err);
        return res.status(500).send({
            error: true,
            message: "Internal server error"
        })
    }
}

module.exports.addEmployee = async (req, res) => {
    try {
        let data = req.body;
        const salt = await bcrypt.genSalt(6);
        const hash = await bcrypt.hash(data.password, salt);
        const token = jwt.sign({ email: data.email }, TOKEN_KEY, { expiresIn: '2h' })
        data.password = hash;
        data.token = token;
        const result = await Employee.create(data);
        if (result) {
            return res.status(200).send({
                success: true,
                message: "Employee added successfully"
            })
        }
        else {
            return res.status(400).send({
                success: false,
                message: "Employee could not be Added"
            })
        }
    }
    catch (err) {
        console.log("addEmployee internal server error", err);
        return res.status(500).send({
            error: true,
            message: "Internal server error"
        })
    }
}

module.exports.getEmployee = async (req, res) => {
    try {
        const totalDocs = await Employee.countDocuments();
        const result = await Employee.find();
        if (result.length) {
            return res.status(200).send({
                success: true,
                message: "Data found",
                totalDocs,
                result
            })
        }
        else {
            return res.status(200).send({
                success: false,
                message: "No data found",
                totalDocs: 0,
                result: []
            })
        }
    }
    catch (err) {
        console.log("getEmployee internal server error", err);
        return res.status(500).send({
            error: true,
            message: "Internal server error"
        })
    }
}

module.exports.deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Employee.deleteOne({ _id: id });
        if (result && result.deletedCount === 1) {
            return res.status(200).send({
                success: true,
                message: "Data is deleted successfully",
            })
        }
        else {
            return res.status(400).send({
                success: false,
                message: "No data found"
            })
        }
    }
    catch (err) {
        console.log("deleteEmployee internal server error", err);
        return res.status(500).send({
            error: true,
            message: "Internal server error"
        })
    }
}

module.exports.updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const result = await Employee.findOneAndUpdate({ _id: id }, data, { new: true });
        if (result) {
            return res.status(200).send({
                success: true,
                message: "Employee updated successfully",
                result
            })
        }
        else {
            return res.status(400).send({
                success: false,
                message: "No data found",
            })
        }
    }
    catch (err) {
        console.log("updateEmployee internal server error", err);
        return res.status(500).send({
            error: true,
            message: "Internal server error"
        })
    }
}

module.exports.getEmployeeLeaveRequest = async (req, res) => {
    try {

        const result = await LeaveRequest.aggregate([
            {
                $match: {
                    status: CREATED
                }
            },
            {
                $lookup: {
                    from: "employees",
                    localField: "employeeId",
                    foreignField: "_id",
                    as: "employee"
                }
            },
            {
                $unwind: "$employee"
            },
            {
                $project: {
                    fName: '$employee.fName',
                    lName: "$employee.lName",
                    employeeId: "$employee._id"
                }
            }
        ])
        if(result && result.length) {
            return res.status(200).send({
                success: true,
                message: "Data Found",
                result
            })
        } else {
            return res.status(200).send({
                success: false,
                message: "Data Not Found",
                result: []
            })
        }
    } catch(err) {
        console.log("getEmployeeLeaveRequest internal server error", err);
        return res.status(500).send({
            error: true,
            message: "Internal server error"
        })
    }
}

module.exports.updateEmployeeLeaveRequest = async (req, res) => {
    try {
        console.log("updateEmployeeLeaveRequest");
        const { _id, status } = req.query;
        const updateLeaveRequest = await LeaveRequest.findOneAndUpdate({ _id }, { status, modifiedAt: new Date() }, { new: true });
        if(status === APPROVED) {
            const emplopyee = await Employee.findOne({ _id: updateLeaveRequest.employeeId }, { jobTitleId: 1 });
            var data = {
                employeeId: emplopyee._id,
                jobId: emplopyee.jobTitleId,
                date: new Date()
            }
            const leave = await Leave.create(data);
            data = {
                employeeId: emplopyee._id,
                jobId: emplopyee.jobTitleId,
                leaveId: leave._id,
                totalLabor: 0,
                salary: PER_DAY_EXTRA_COST,
                date: new Date()
            }
            const attendanceReport = await AttendanceReport.create(data);
        }
        return res.status(200).send({
            success: true,
        })

    } catch(err) {
        console.log("updateEmployeeLeaveRequest internal server error", err);
        return res.status(500).send({
            error: true,
            message: "Internal server error"
        })
    }
}

module.exports.getDashboardCount = async (req, res) => {
    try {
        const departments = await Department.countDocuments();
        const jobTitles = await JobTitle.countDocuments();
        const employees = await Employee.countDocuments();
        return res.status(200).send({
            success: true,
            departments,
            jobTitles,
            employees
        })
    }
    catch (err) {
        console.log("getDashboardCount internal server error", err);
        return res.status(500).send({
            error: true,
            message: "Internal server error"
        })
    }
}

module.exports.getAttendanceReport = async (req, res) => {
    try {
        const result = await Employee.aggregate([
            {
                $lookup: {
                    from: "dutydurations",
                    localField: "_id",
                    foreignField: "employeeId",
                    as: "duty",
                },
            },
            {
                $unwind: "$duty",
            },
            {
                $lookup: {
                    from: "attendancereports",
                    localField: "_id",
                    foreignField: "employeeId",
                    as: "report",
                },
            },
            {
                $unwind: "$report",
            },
            {
                $group: {
                    _id: "$report.employeeId",
                    salary: { $sum: "$report.salary" },
                    totalLabor: { $sum: "$report.totalLabor" },
                    workTimeInMins: { $sum: "$duty.duration" },
                    fName: { "$first": "$fName" },
                    lName: { "$first": "$lName" }
                }
            },
        ])
        return res.status(200).send({
            success: true,
            result
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
