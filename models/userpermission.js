"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class UserPermission extends Model {
      static associate(models) {
        UserPermission.belongsTo(models.User, {
          foreignKey: "userId",
          as: "User",
        });

        UserPermission.belongsTo(models.Permission, {
          foreignKey: "permissionId",
          as: "Permission",
        });
      }
    }

    UserPermission.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        isDeleted: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "UserPermission",
        tableName: "user-permissions",
        timestamps: true,
      }
    );

    return UserPermission;
};