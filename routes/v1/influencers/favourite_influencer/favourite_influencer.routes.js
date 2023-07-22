const {

    wishlist
} = require('../controllers/favourite_influencer.controller');

const {authJWT} = require("../../../middlewares/verify_token");

function wishlistRoutes(app) {

    app.post("/add-wishlist",authJWT,(req, res)=> {
        wishlist(req, res);
    });

}


module.exports = {
    wishlistRoutes,
};