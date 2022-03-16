const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobTitleSchema = new Schema({
    jobTitle: String,
    deptId: { type: Schema.Types.ObjectId, ref: 'Department' }
})

const JobTitle = module.exports = mongoose.model('JobTitle', jobTitleSchema)