"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Designation extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Define associations here if needed
        }
    }

    Designation.init({
        designation_name: {
            type: DataTypes.STRING,
            allowNull: false, // Mandatory field
        },
        description: {
            type: DataTypes.STRING,
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false, // Default to false for soft deletion
        },
    }, {
        sequelize,
        modelName: "Designation", // Model name
    });

    return Designation;
};