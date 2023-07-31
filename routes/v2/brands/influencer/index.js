
const express = require("express");
const router = express.Router();
const {
    getInfluencerList,
    getInfluencerDemoList,
    getInfluencerDetails,
    markFavourite,
    getFavouriteInfluencers
} = require('../../../../controllers/v2/brands/influencer/influencer');

router.get("/get",(req, res)=> {
    getInfluencerList(req, res);
});

router.get("/demo",(req, res)=> {
    getInfluencerDemoList(req, res);
});

router.get("/details/:influencer_id", (req, res)=>{
    getInfluencerDetails(req,res);
});

router.post("/mark-favourite/:brand_id", (req, res)=> {
    markFavourite(req, res);
});


router.get("/get-favourite-influencers/:brand_id", (req, res)=> {
    getFavouriteInfluencers(req, res);
});


module.exports =  router;