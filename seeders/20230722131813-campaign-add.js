'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
 
      await queryInterface.bulkInsert('campaign', [{
        brand_id :1,
        campaign_status_id:1,
        campaign_name :"testcampaing",
        location:"kolkata",
        campaign_about:"about",
        language:"hindi",
        campaign_start_dt:"2000/11/12",
        campaign_end_dt:"2000/11/11",
        payment_type:"phonepay",
        campaign_budget:500,
        image_link:"wwww",
        campaign_delete:0,
        
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
