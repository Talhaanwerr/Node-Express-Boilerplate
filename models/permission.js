"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    static associate(models) {
      Permission.belongsToMany(models.Role, {
        through: models.RolePermission,
        foreignKey: "id",
        as: "Roles",
      });

      Permission.belongsToMany(models.User, {
        through: models.UserPermission,
        foreignKey: "id",
        as: "Users",
      });
    }
  }

  Permission.init(
    {
      name: {
        type: DataTypes.STRING,
      },
      module: {
        type: DataTypes.STRING,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Permission",
    }
  );
  return Permission;
};
