"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "roles",
      [
        {
          name: "Administrator",
          canCreate: true,
          canRead: true,
          canUpdate: true,
          canDelete: true,
        },
        {
          name: "Reader",
          canCreate: false,
          canRead: true,
          canUpdate: false,
          canDelete: false,
        },
        {
          name: "Creator",
          canCreate: true,
          canRead: false,
          canUpdate: true,
          canDelete: true,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("roles", null, {});
  },
};
