"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Attendance extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Define association: Attendance belongs to a User
            Attendance.belongsTo(models.User, {
                foreignKey: "userId",
                as: "user",
            });
        }
    }

    Attendance.init({
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "User",
                key: "id",
            },
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("Present", "Absent", "Late", "Excused"),
            allowNull: false,
        },
        remarks: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }, {
        sequelize,
        modelName: "Attendance",
        tableName: "attendances",
        timestamps: true,
    });

    return Attendance;
};