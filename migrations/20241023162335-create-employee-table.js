'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Creating the employees table
    await queryInterface.createTable('employees', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false
      },
      workDays: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      timeWorkedHours: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      timeWorkedMinutes: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      balancedTime: {
        type: Sequelize.STRING,
        allowNull: false
      },
      activityLevel: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      workDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },

  async down(queryInterface, Sequelize) {
 
    await queryInterface.dropTable('employees');
  }
};
