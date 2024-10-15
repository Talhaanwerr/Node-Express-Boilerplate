// controllers/leaveController.js

const Leave = require('../models/leaveModel'); // Import Leave model

// Apply for leave
const applyLeave = async(req, res) => {
    const { leaveYear, leaveType, balance, description, fromDate, toDate } = req.body;
    try {
        const newLeave = new Leave({
            leaveYear,
            leaveType,
            balance,
            description,
            fromDate,
            toDate,
        });
        await newLeave.save();
        res.status(200).json({ message: 'Leave applied successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Error applying leave' });
    }
};

// Fetch all leaves
const getLeaves = async(req, res) => {
    try {
        const leaves = await Leave.find();
        res.status(200).json(leaves);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching leaves' });
    }
};

module.exports = { applyLeave, getLeaves };