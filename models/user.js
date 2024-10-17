"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // User-Role relationship (Many-to-Many with Permission through RolePermission)
            User.belongsToMany(models.Permission, {
                through: models.UserPermission, // UserPermission table for the many-to-many relationship
                foreignKey: 'userId', // foreign key in the pivot table
                as: 'Permissions',
            });
            User.hasMany(models.UserPermission, {
                foreignKey: 'userId', // foreign key in UserPermission table
                as: 'UserPermissions',
            });
        }
    }

    User.init({
        userId: { // userId column
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userName: { // userName column
            type: DataTypes.STRING,
            allowNull: false,
        },
        isDeleted: { // isDeleted column for soft delete functionality
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }, {
        sequelize,
        modelName: "User", // Model name is User
    });
    return User;
};