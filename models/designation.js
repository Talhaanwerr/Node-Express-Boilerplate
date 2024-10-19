"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Designation extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
        // Define associations here if needed
        Designation.hasMany(models.User, {
          foreignKey: "designationId",
          as: "users",
          onDelete: "SET NULL",
        });
      }
    }

    Designation.init(
      {
        designation_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
        },
        type: {
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