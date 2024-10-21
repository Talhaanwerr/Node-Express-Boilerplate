const { DataTypes } = require('sequelize');
const sequelize = require('./index');


const Employee = sequelize.define('Employee', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    workDays: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    timeWorkedHours: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    timeWorkedMinutes: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    balancedTime: {
        type: DataTypes.STRING,
        allowNull: false
    },
    activityLevel: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    workDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    tableName: 'employees',
    timestamps: false
});

module.exports = Employee;