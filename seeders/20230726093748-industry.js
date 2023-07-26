'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.bulkInsert('industry', [{
      industry_name: 'Food industry',
    //  industry_name: 'Construction',
     // industry_name: 'Manufacturing',
      //industry_name: 'Transportation',
      //industry_name: 'Agriculture',
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
