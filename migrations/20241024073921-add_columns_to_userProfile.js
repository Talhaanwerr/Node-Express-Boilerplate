"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("UserProfiles", "employeeType", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("UserProfiles", "department", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("UserProfiles", "totalExperience", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("UserProfiles", "maritalStatus", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("UserProfiles", "aboutMe", {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.addColumn("UserProfiles", "emergencyContactName", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("UserProfiles", "employeeType");
    await queryInterface.removeColumn("UserProfiles", "department");
    await queryInterface.removeColumn("UserProfiles", "totalExperience");
    await queryInterface.removeColumn("UserProfiles", "maritalStatus");
    await queryInterface.removeColumn("UserProfiles", "aboutMe");
    await queryInterface.removeColumn("UserProfiles", "emergencyContactName");
  },
};
