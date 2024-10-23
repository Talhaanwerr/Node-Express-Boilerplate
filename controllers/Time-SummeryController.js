const employees = require('../models/time-summery');
const { Op, Sequelize } = require('sequelize');

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

// Controller function to return time summary with filtering, searching, sorting, and pagination
const getTimeSummary = async (req, res) => {
    const { team, month, day, date, week, search, sortBy, order = 'DESC', page = 1, limit = 10 } = req.query;

    // Get the current date for filtering
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    let whereCondition = {};

    // Month filtering
    if (month === 'current') {
        whereCondition.workDate = {
            [Op.and]: [
                Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('workDate')), currentMonth),
                Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('workDate')), currentYear)
            ]
        };
    } else if (month) {
        whereCondition.workDate = {
            [Op.and]: [
                Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('workDate')), month),
                Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('workDate')), currentYear)
            ]
        };
    }

    // Day filtering
    if (day === 'current') {
        whereCondition.workDate = {
            [Op.eq]: currentDate
        };
    }

    // Date filtering
    if (date) {
        whereCondition.workDate = {
            [Op.eq]: new Date(date)
        };
    }

    // Week filtering (assuming the week starts on Monday)
    if (week) {
        const startOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1)); // Monday
        const endOfWeek = new Date(currentDate.setDate(startOfWeek.getDate() + 6)); // Sunday
        whereCondition.workDate = {
            [Op.between]: [startOfWeek, endOfWeek]
        };
    }

    // Search functionality by name or role
    if (search) {
        whereCondition[Op.or] = [
            { name: { [Op.like]: `%${search}%` } },
            { role: { [Op.like]: `%${search}%` } }
        ];
    }

    // Sorting by a specified column in descending order
    let orderBy = [['name', order]]; // Default sort by name
    if (sortBy === 'role') {
        orderBy = [['role', order]];
    }

    // Pagination logic
    const offset = (page - 1) * limit;
    const pagination = { limit: parseInt(limit), offset: parseInt(offset) };

    try {
        const employees = await Employee.findAll({
            where: whereCondition,
            order: orderBy,
            ...pagination
        });

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

module.exports = { getTimeSummary };
