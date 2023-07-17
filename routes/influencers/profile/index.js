const express = require("express");
const router = express.Router();

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
    });

//}
module.exports =  router;

// module.exports = {
//     contentNicheRoutes,
// };