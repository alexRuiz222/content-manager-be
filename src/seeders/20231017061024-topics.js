"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "topics",
      [
        {
          name: "Science",
        },
        {
          name: "Maths",
        },
        {
          name: "Sports",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("topics");
  },
};
