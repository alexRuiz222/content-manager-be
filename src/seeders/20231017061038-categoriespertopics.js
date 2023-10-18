"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "categoriespertopics",
      [
        {
          topicId: 1,
          categoryId: 1,
        },
        {
          topicId: 1,
          categoryId: 2,
        },
        {
          topicId: 1,
          categoryId: 3,
        },
        {
          topicId: 2,
          categoryId: 1,
        },
        {
          topicId: 2,
          categoryId: 2,
        },
        {
          topicId: 3,
          categoryId: 1,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("categoriespertopics");
  },
};
