const express = require("express");
const router = express.Router();
const {
    updatedInfluencerPrice,
    add_influencer_price
} = require('../../../controllers/influencer/profile/influencer_price.controller');
const {
    AddContentNiche,
    
} = require('../../../controllers/influencer/profile/content_niche.controller');
const {
    getProfile,
    updateprofile,
} = require('../../../controllers/influencer/profile/influencer_users.controller');
const {authJWT} = require("../../../utils/tokenchecker");


    

    
    router.post("/add-content-niche/:influencer_id",(req, res)=> {
        AddContentNiche(req, res);  
    });
     router.patch("/update-influencer-price/:influencer_id", (req, res) => {
        updatedInfluencerPrice(req, res);
    });
    router.post("/add-influencer-price", (req, res) => {
       add_influencer_price(req, res);
       
    });

    router.get("/get-influencer-profile/:influencer_id",(req, res)=> {
        getProfile(req, res);
    });

    router.patch("/update-influencer-profile/:influencer_id",(req, res)=> {
        updateprofile(req, res);
    });
    
   


module.exports =  router;