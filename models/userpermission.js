"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class UserPermission extends Model {
        static associate(models) {
            // Association with User
            UserPermission.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'User',
            });
            // Association with Permission
            UserPermission.belongsTo(models.Permission, {
                foreignKey: 'permissionId',
                as: 'Permission',
            });
        }
    }

    UserPermission.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Users",
                key: "userId",
            },
        },
        permissionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Permissions", 
                key: "id",
            },
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
    }, {
        sequelize,
        modelName: "UserPermission",
        tableName: "user-permissions", 
        timestamps: true,
    });

    return UserPermission;
};