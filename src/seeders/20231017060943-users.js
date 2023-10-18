"use strict";

/** @type {import('sequelize-cli').Migration} */
const { encryptPassword } = require("../helpers/password.helper");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          username: "admin",
          email: "admin@domain.com",
          roleId: 1,
          Password: await encryptPassword("admin123"),
        },
        {
          username: "reader",
          email: "reader@domain.com",
          roleId: 2,
          Password: await encryptPassword("reader123"),
        },
        {
          username: "creator",
          email: "creator@domain.com",
          roleId: 3,
          Password: await encryptPassword("creator123"),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
