const express = require("express");
const router = express.Router();
const {
    updatedInfluencerPrice,
    add_influencer_price
} = require('../../../controllers/influencer/profile/influencer_price.controller');
const {
    GetContentNiche,
    AddContentNiche
} = require('../../../controllers/influencer/profile/content_niche.controller');

const {authJWT} = require("../../../utils/tokenchecker");

//function contentNicheRoutes(app) {

router.get("/get-content-niche",authJWT,(req, res)=> {
        GetContentNiche(req, res);
    });
    
    router.post("/add-content-niche",authJWT,(req, res)=> {
        AddContentNiche(req, res);
       console.log("pk");
    });

    router.patch("/update-influencer-price", authJWT, (req, res) => {
        updatedInfluencerPrice(req, res);
    });

    router.post("/add-influencer-price", authJWT, (req, res) => {
       // add_influencer_price(req, res);
       console.log("pk");
    });

//}
module.exports =  router;

// module.exports = {
//     contentNicheRoutes,
// };