const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Attendance extends Model {}

Attendance.init({
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    check_in_time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    check_out_time: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING(50),
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Attendance',
    tableName: 'attendances',
    timestamps: true,
});

module.exports = Attendance;