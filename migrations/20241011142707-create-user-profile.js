"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("UserProfiles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      contactNo: {
        type: Sequelize.INTEGER,
      },
      emergencyContact: {
        type: Sequelize.INTEGER,
      },
      cnicNo: {
        type: Sequelize.BIGINT,
      },
      dateOfBirth: {
        type: Sequelize.DATEONLY,
      },
      city: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      joinedDate: {
        type: Sequelize.DATE,
      },
      branch: {
        type: Sequelize.STRING,
      },
      profilePicture: {
        type: Sequelize.BLOB,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
        allowNull: false,
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("UserProfiles");
  },
};
