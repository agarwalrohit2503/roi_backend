
const express = require("express");
const router = express.Router();
const {
    getAllCampaign,
    deleteCampaign,
  
} = require('../../../../controllers/v2/brands/campaign/campaign');

router.get("/get/:brand_id",(req, res)=> {
    getAllCampaign(req, res);
});



router.patch("/delete/:brand_id",(req, res)=> {
    deleteCampaign(req, res);
});



module.exports =  router;