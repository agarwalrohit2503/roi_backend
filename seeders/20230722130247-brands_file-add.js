"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     }], {});
    */

    await queryInterface.bulkInsert(
      "brands_file",
      [
        {
          brand_id: 1,
          file_type: "doc",
          file_type: "png",
          file_link: "wwww.google.com",
          file_name: "test",
          delete_flag: 0,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
