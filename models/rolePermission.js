// RolePermission.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class RolePermission extends Model {
    static associate(models) {
      RolePermission.belongsTo(models.Role, {
        foreignKey: 'roleId',
        as: 'Role',
      });
      RolePermission.belongsTo(models.Permission, {
        foreignKey: 'permissionId',
        as: 'Permission',
      });
    }
  }

  RolePermission.init(
    {
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Roles",
          key: "roleId",
        },
        primaryKey: true,
      },
      permissionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Permissions",
          key: "id",
        },
        primaryKey: true,
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
      modelName: "RolePermission",
      tableName: "rolepermissions",
      timestamps: true,
    }
  );

  return RolePermission;
};
