"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    static associate(models) {
      
    }
  }

  Employee.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      workDays: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      timeWorkedHours: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      timeWorkedMinutes: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      balancedTime: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      activityLevel: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },

      workDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Employee",
      tableName: "employees",
      timestamps: false, 
    }
  );

  return Employee;
};
