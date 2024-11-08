"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.belongsToMany(models.Permission, {
        through: models.RolePermission, 
        foreignKey: "roleId",
        as: "Permissions",
      });

      Role.hasMany(models.RolePermission, {
        foreignKey: "roleId",
        as: "RolePermissions",
      }); 

      Role.hasMany(models.User, {
        foreignKey: "roleId",
        as: "users",
        onDelete: "SET NULL",
      });
    }
  }

  Role.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Role",
    }
  );
  return Role;
};
