"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Designation extends Model {

        static associate(models) {
            // Association with User model
            Designation.hasMany(models.User, {
                foreignKey: "designationId",
                as: "users",
                onDelete: "SET NULL",
            });
        }
    }

    Designation.init({
        designation_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Designation name is required",
                },
                notEmpty: {
                    msg: "Designation name must not be empty",
                },
            },
        },
        description: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [0, 255],
                    msg: "Description should not exceed 255 characters",
                },
            },
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false, // By default, it's not deleted
        },
    }, {
        sequelize,
        modelName: "Designation",
        paranoid: true,
        timestamps: true,
    });

    return Designation;
};