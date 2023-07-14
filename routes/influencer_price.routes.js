const {
    updatedInfluencerPrice,
    add_influencer_price
} = require('../controllers/influencer_price.controller');

const {authJWT} = require("../utils/tokenchecker");

function influencerPriceRoutes(app) {

    app.patch("/update-influencer-price",authJWT,(req, res)=> {
        updatedInfluencerPrice(req, res);
    });
    
    app.post("/add-influencer-price",authJWT,(req, res)=> {
        add_influencer_price(req, res);
    });

}


module.exports = {
    influencerPriceRoutes,
};