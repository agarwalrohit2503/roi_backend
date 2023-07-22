'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
   
   await queryInterface.bulkInsert('brand_type', [{
    brand_type_name: 'agency',
    brand_type_name: 'Influencer',
   //  isBetaMember: false
   }], {});
  },
// 
  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
