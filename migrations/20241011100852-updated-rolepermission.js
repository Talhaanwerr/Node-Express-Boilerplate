"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("RolePermissions", {
      roleId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Roles", 
          key: "roleId",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        primaryKey: true, 
      },
      permissionId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Permissions", 
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        primaryKey: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("RolePermissions");
  },
};
