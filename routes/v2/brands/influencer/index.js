
const express = require("express");
const router = express.Router();
const {
    getInfluencerList,
    updateBrandprofile
} = require('../../../../controllers/v2/brands/influencer/influencer');

router.get("/get",(req, res)=> {
    getInfluencerList(req, res);
});

router.patch("/update-details/:brand_id",(req, res)=> {
    updateBrandprofile(req, res);
});

module.exports =  router;