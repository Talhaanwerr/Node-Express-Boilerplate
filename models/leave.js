// models/leaveModel.js

const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
    leaveYear: {
        type: Number,
        required: true,
    },
    leaveType: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    fromDate: {
        type: Date,
        required: true,
    },
    toDate: {
        type: Date,
        required: true,
    },
});

const Leave = mongoose.model('Leave', leaveSchema);
module.exports = Leave;