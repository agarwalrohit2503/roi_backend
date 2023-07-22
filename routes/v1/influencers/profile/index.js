const express = require("express");
const router = express.Router();
const {
    updatedInfluencerPrice,
    add_influencer_price
} = require('../../../../controllers/v1/influencer/profile/influencer_price.controller');
const {
    AddContentNiche,
    
} = require('../../../../controllers/v1/influencer/profile/content_niche.controller');
const {
    getProfile,
    updateprofile,
} = require('../../../../controllers/v1/influencer/profile/influencer_users.controller');



    

    
    router.post("/add-content-niche/:influencer_id",(req, res)=> {
        AddContentNiche(req, res);  
    });
     router.patch("/update-price/:influencer_id", (req, res) => {
        updatedInfluencerPrice(req, res);
    });
    router.post("/add-price", (req, res) => {
       add_influencer_price(req, res);
       
    });

    router.get("/details/:influencer_id",(req, res)=> {
        getProfile(req, res);
    });

    router.patch("/update-details/:influencer_id",(req, res)=> {
        updateprofile(req, res);
    });
    
   


module.exports =  router;