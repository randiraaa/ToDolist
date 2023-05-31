"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        username: "randira",
        email: "randiraa@gmail.com",
        password: "123randi4",
        roles: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "anggia",
        email: "anggia@gmail.com",
        password: "123anggia4",
        roles: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
