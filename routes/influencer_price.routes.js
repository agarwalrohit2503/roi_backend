const {
    updatedInfluencerPrice,
    add_influencer_price
} = require('../controllers/influencer_price.controller');

const {authJWT} = require("../utils/tokenchecker");

function influencerPriceRoutes(app) {

    app.patch("/update-profile",(req, res)=> {
        updatedInfluencerPrice(req, res);
    });
    
    app.patch("/add-influencer-price",(req, res)=> {
        add_influencer_price(req, res);
    });

}


module.exports = {
    influencerPriceRoutes,
};