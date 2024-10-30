"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("announcements", "date", {
      type: Sequelize.DATE,
      allowNull: true, // Set to false if date should be mandatory
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("announcements", "date");
  },
};
