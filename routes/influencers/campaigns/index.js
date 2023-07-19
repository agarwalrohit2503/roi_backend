const express = require("express");
const router = express.Router();
const {
    getCampaigns,
    getCampaignDetails,
    addCampaigns,
    guestApi,
    applied
    
} = require('../../../controllers/influencer/campaigns/campaigns.controller.js');


router.get("/campaigns",(req, res) => {
    getCampaigns(req, res);
});

router.get("/campaign-details/:campaign_id" ,(req, res) => {
    getCampaignDetails(req, res);
});

router.post("/add-campaigns",(req,res) =>{
    addCampaigns(req,res);
});

router.get("/guest-api" ,(req, res) => {
    guestApi(req, res);
});

router.get("/applied/:influencer_id" ,(req, res) => {
    applied(req, res);
});


module.exports =  router;