'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Leave extends Model {
   
    static associate(models) {
      
    }
  }
  Leave.init({
    type_of_leave: DataTypes.STRING,
    available: DataTypes.INTEGER,
    used: DataTypes.INTEGER,
    booked: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Leave',
  });
  return Leave;
};