
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class RolePermission extends Model {
    static associate(models) {
      RolePermission.belongsTo(models.Role, {
        foreignKey: "roleId",
        as: "Role",
      });
      RolePermission.belongsTo(models.Permission, {
        foreignKey: "permissionId",
        as: "Permission",
      });
    }
  } 
 
  RolePermission.init(
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
      modelName: "RolePermission",
      tableName: "rolepermissions",
      timestamps: true,
    }
  );
  
  
  

  return RolePermission;
};
