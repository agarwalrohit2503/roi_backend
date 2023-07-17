const {
    GetContentNiche,
    AddContentNiche
} = require('../controllers/content_niche.controller');

const {authJWT} = require("../utils/tokenchecker");

function contentNicheRoutes(app) {

    app.get("/get-content-niche",authJWT,(req, res)=> {
        GetContentNiche(req, res);
    });
    
    app.post("/add-content-niche",authJWT,(req, res)=> {
        AddContentNiche(req, res);
    });

}


module.exports = {
    contentNicheRoutes,
};