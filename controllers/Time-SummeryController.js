const employees = require('../models/time-summery');
const { Op } = require('sequelize');

// Standard working hours per day 
const standardDailyHours = 8;

// Function to calculate balanced time
const calculateBalancedTime = (workDays, timeWorkedHours, timeWorkedMinutes) => {
    const totalWorkedMinutes = (timeWorkedHours * 60) + timeWorkedMinutes;
    const totalPossibleMinutes = workDays * standardDailyHours * 60;
    const balancedMinutes = totalPossibleMinutes - totalWorkedMinutes;

    const balancedHours = Math.floor(balancedMinutes / 60);
    const remainingMinutes = balancedMinutes % 60;
    return { balancedHours, remainingMinutes };
};

// Function to calculate activity level
const calculateActivityLevel = (timeWorkedHours, timeWorkedMinutes, workDays) => {
    const totalWorkedMinutes = (timeWorkedHours * 60) + timeWorkedMinutes;
    const totalPossibleMinutes = workDays * standardDailyHours * 60;
    return ((totalWorkedMinutes / totalPossibleMinutes) * 100).toFixed(2) + '%';
};

// Controller function to return time summary
const getTimeSummary = async(req, res) => {
    const { team, month, day } = req.query;

    // Get the current date and month for filtering
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    let whereCondition = {};

    if (month === 'current') {
        // Filter by current month
        whereCondition.workDate = {
            [Op.and]: [
                sequelize.where(sequelize.fn('MONTH', sequelize.col('workDate')), currentMonth),
                sequelize.where(sequelize.fn('YEAR', sequelize.col('workDate')), currentYear)
            ]
        };
    }

    if (day === 'current') {
        // Filter by current day
        whereCondition.workDate = {
            [Op.eq]: currentDate
        };
    }

    try {
        const employees = await Employee.findAll({ where: whereCondition });

        const timeSummary = employees.map(emp => {
            const { balancedHours, remainingMinutes } = calculateBalancedTime(emp.workDays, emp.timeWorkedHours, emp.timeWorkedMinutes);
            const activityLevel = calculateActivityLevel(emp.timeWorkedHours, emp.timeWorkedMinutes, emp.workDays);

            return {
                name: emp.name,
                role: emp.role,
                workDays: emp.workDays,
                timeWorked: `${emp.timeWorkedHours}h ${emp.timeWorkedMinutes}min`,
                balancedTime: `${balancedHours}h ${remainingMinutes}min`,
                activityLevel: activityLevel
            };
        });

        res.json(timeSummary);
    } catch (error) {
        res.status(500).json({ message: "Error fetching time summary", error });
    }
};

// Export the controller function
module.exports = { getTimeSummary };