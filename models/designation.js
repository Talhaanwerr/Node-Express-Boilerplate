"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Designation extends Model {
      static associate(models) {
        Designation.hasMany(models.User, {
          foreignKey: "designationId",
          as: "user",
          onDelete: "SET NULL",
        });
      }
    }

    Designation.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
        },
        isDeleted: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
      },
      {
        sequelize,
        modelName: "Designation",
      }
    );

    return Designation;
};