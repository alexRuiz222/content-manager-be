"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          name: "Video",
          type: "URL_VIDEO",
        },
        {
          name: "Image",
          type: "IMAGE",
        },
        {
          name: "Text",
          type: "TEXT",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("categories");
  },
};
