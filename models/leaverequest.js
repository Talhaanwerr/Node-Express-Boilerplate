"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LeaveRequest extends Model {
    static associate(models) {
      LeaveRequest.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });

      LeaveRequest.belongsTo(models.User, {
        foreignKey: "approverBy",
        as: "approver",
      });
    }
  }
  LeaveRequest.init(
    {
      leaveType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
        // defaultValue :
      },
      description: {
        type: DataTypes.TEXT,
      },
      leavePeriod: {
        type: DataTypes.ENUM("Full day", "Half day"),
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "approved", "rejected"),
        defaultValue: "pending",
      },
    },
    {
      sequelize,
      modelName: "LeaveRequest",
    }
  );
  return LeaveRequest;
};
