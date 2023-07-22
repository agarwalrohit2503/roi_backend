const express = require("express");
const router = express.Router();
const {
    getCampaigns,
    getCampaignDetails,
    addCampaigns,
    guestApi,
    applied
    
} = require('../../../../controllers/v1/influencer/campaigns/campaigns.controller');


router.get("/get",(req, res) => {
    getCampaigns(req, res);
});

router.get("/details/:campaign_id" ,(req, res) => {
    getCampaignDetails(req, res);
});

router.post("/add-campaigns",(req,res) =>{
    addCampaigns(req,res);
});

router.get("/demo" ,(req, res) => {
    guestApi(req, res);
});

router.get("/applied/:influencer_id" ,(req, res) => {
    applied(req, res);
});


module.exports =  router;