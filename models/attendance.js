"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    static associate(models) {
      Attendance.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  Attendance.init(
    {
      checkIn: {
        type: DataTypes.TIME,
      },
      checkOut: {
        type: DataTypes.TIME,
      },
      workedHours: {
        type: DataTypes.TIME,
      },
      date: {
        type: DataTypes.DATE,
      },
      reason: {
        type: DataTypes.STRING,
      },

      description: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.STRING,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Attendance",
    }
  );
  return Attendance;
};
