"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {

    static associate(models) {
      UserProfile.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
        onDelete: "CASCADE",
      });
    }
  }
  UserProfile.init(
    {
      contactNo: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      emergencyContact: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      emergencyContactName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cnicNo: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      employeeType: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      department: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      totalExperience: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      maritalStatus: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      aboutMe: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      joinedDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      // branch: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "UserProfile",
    }
  );
  return UserProfile;
};
