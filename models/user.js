"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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

      User.hasMany(models.Attendance, {
        foreignKey: "userId",
        as: "attendance",
        onDelete: "CASCADE",
      });

      User.hasOne(models.User, {
        foreignKey: "primaryReporting",
        as: "PrimaryReportees",
      });

      User.hasOne(models.User, {
        foreignKey: "secondaryReporting",
        as: "SecondaryReportees",
      });

      User.belongsTo(models.User, {
        foreignKey: "primaryReporting",
        as: "PrimaryReporting",
      });

      User.belongsTo(models.User, {
        foreignKey: "secondaryReporting",
        as: "SecondaryReporting",
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
      shiftTime: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      primaryReporting: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "primaryReportees",
        },
      },
      secondaryReporting: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "secondaryReportees",
        },
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isNewUser: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      resetPasswordToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      resetPasswordExpires: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
