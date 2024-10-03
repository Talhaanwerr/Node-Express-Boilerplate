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
            // define association here
        }
    }

    Designation.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        designation_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // isDeleted: {
        //     type: DataTypes.BOOLEAN,
        //     defaultValue: false,
        // },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: 'Designation',
    });
    return Designation;
};