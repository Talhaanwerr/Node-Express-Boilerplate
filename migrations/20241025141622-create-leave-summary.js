'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LeaveSummaries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      employeeName: {
        type: Sequelize.STRING
      },
      leaveDay: {
        type: Sequelize.INTEGER
      },
      fromDate: {
        type: Sequelize.DATEONLY
      },
      toDate: {
        type: Sequelize.DATEONLY
      },
      activity: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('LeaveSummaries');
  }
};