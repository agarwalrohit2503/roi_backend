const {
   // getProfile,
    // updateprofile,
    // add_address

    wishlist
} = require('../controllers/favourite_influencer.controller');

const {authJWT} = require("../../../utils/tokenchecker");

function wishlistRoutes(app) {

    app.post("/add-wishlist",authJWT,(req, res)=> {
        wishlist(req, res);
    });

    // app.patch("/update-profile", authJWT,(req, res)=> {
    //     updateprofile(req, res);
    // });
    
    // app.patch("/add-address",authJWT,(req, res)=> {
    //     add_address(req, res);
    // });

}


module.exports = {
    wishlistRoutes,
};