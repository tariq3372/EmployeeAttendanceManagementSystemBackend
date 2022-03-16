const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminSchema = new Schema({
    email: { type: 'string', unique: true },
    password: String,
    token: String
})
// Indexing
adminSchema.index({ email: 1 });

const Admin = module.exports = mongoose.model('Admin', adminSchema)