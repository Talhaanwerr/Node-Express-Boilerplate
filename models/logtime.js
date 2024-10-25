"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LogTime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      LogTime.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  LogTime.init(
    {
      checkIn: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      checkOut: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      reason: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      description: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "LogTime",
    }
  );
  return LogTime;
};
