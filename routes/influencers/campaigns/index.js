const express = require("express");
const router = express.Router();
const {
    getCampaigns,
    getCampaignDetails,
    addCampaigns
    
} = require('../../../controllers/influencer/campaigns/campaigns.controller.js');


router.get("/get-campaigns",(req, res) => {
    getCampaigns(req, res);
});

router.get("/get-campaign-details/:campaign_id" ,(req, res) => {
    getCampaignDetails(req, res);
});

router.post("/add-campaigns",(req,res) =>{
    addCampaigns(req,res);
});

module.exports =  router;