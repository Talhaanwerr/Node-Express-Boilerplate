"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Leave extends Model {
    static associate(models) {
      Leave.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
        onDelete: "SET NULL",
      });
    }
  }
  Leave.init(
    {
      typeOfLeave: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      availableLeaves: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      usedLeaves: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalLeaves: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bookedLeaves: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Leave",
    }
  );
  return Leave;
};
