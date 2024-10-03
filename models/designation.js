'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Designation extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Designation.init({
        designation_name: DataTypes.STRING,
        description: DataTypes.STRING,
        // type: DataTypes.STRING,
        isDeleted: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'Designation',
    });
    return Designation;
};