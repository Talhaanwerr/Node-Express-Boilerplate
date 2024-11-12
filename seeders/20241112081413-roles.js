"use strict";
const { Role, User } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const superAdminRole = await Role.create({
      name: "Super Admin",
      description: "Administrator",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await User.create({
      firstName: "Super ",
      lastName: "Admin",
      email: "SuperAdmin123@gmail.com",
      password: "Admin123",
      isNewUser: 1,
      shiftTime: "evening",
      status: "Active",
      roleId: superAdminRole.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  },

  async down(queryInterface, Sequelize) {
    await User.destroy({ where: { email: "SuperAdmin123@example.com" } });
    await Role.destroy({ where: { firstName: "Super" } });
  },
};
