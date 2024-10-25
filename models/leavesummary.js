'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LeaveSummary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LeaveSummary.init({
    employeeName: DataTypes.STRING,
    leaveDay: DataTypes.INTEGER,
    fromDate: DataTypes.DATEONLY,
    toDate: DataTypes.DATEONLY,
    activity: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'LeaveSummary',
  });
  return LeaveSummary;
};