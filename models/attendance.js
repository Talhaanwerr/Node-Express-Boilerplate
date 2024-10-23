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
      date: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Attendance",
    }
  );
  return Attendance;
};
