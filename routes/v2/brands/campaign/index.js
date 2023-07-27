
const express = require("express");
const router = express.Router();
const {
    getAllCampaign,
    updateBrandprofile,
    getInfluencerDemoList
} = require('../../../../controllers/v2/brands/campaign/campaign');

router.get("/get",(req, res)=> {
    getAllCampaign(req, res);
});

router.get("/demo",(req, res)=> {
    getInfluencerDemoList(req, res);
});

router.patch("/update-details/:brand_id",(req, res)=> {
    updateBrandprofile(req, res);
});



module.exports =  router;