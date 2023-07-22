'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('brand', [{
      //city_id: 1,
     // state_id: 1 ,
      brand_type_id: 1,
      brand_logo:"wwww.google.com",
      name:"demo",
      email:"demo@gmail.com",
      number:"1234567890",
      gst_number:"12345678",
      website:"www.youdomain.com",
      pan_card:"123456789",
      address:"demoaddress",
      overview:"your bio",
      profile_status:0,
      account_delete	:0,
     //  isBetaMember: false
     }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
