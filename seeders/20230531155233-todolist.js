"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("todolist", [
      {
        description: "Musik",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: "Olahraga",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("todolist", null, {});
  },
};
