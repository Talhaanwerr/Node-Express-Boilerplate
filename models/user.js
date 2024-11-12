"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.UserProfile, {
        foreignKey: "userId",
        as: "profile",
        onDelete: "CASCADE",
      });

      User.belongsTo(models.Role, {
        foreignKey: "roleId",
        as: "role",
        onDelete: "SET NULL",
      });

      User.belongsTo(models.Designation, {
        foreignKey: "designationId",
        as: "designation",
        onDelete: "SET NULL",
      });

      User.belongsToMany(models.Permission, {
        through: models.UserPermission,
        foreignKey: "userId",
        as: "permissions",
      });

      User.hasMany(models.Attendance, {
        foreignKey: "userId",
        as: "attendance",
        onDelete: "CASCADE",
      });

      User.belongsTo(models.User, {
        foreignKey: "primaryReporting",
        as: "primaryReport",
        onDelete: "SET NULL",
      });

      User.belongsTo(models.User, {
        foreignKey: "secondaryReporting",
        as: "secondaryReport",
        onDelete: "SET NULL",
      });

      User.hasOne(models.Leave, {
        foreignKey: "userId",
        as: "leave",
        onDelete: "CASCADE",
      });
      
      User.hasMany(models.LeaveRequest, {
        foreignKey: "userId",
        as: "leaveRequests",
        onDelete: "CASCADE",
      });
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isNewUser: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      shiftTime: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      profilePicture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      resetPasswordToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      resetPasswordExpires: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
