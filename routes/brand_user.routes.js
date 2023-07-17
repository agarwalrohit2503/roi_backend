const {
    getProfile,
    // updateprofile,
    // add_address
} = require('../controllers/brand_user.controller');

const {authJWT} = require("../utils/tokenchecker");

function brandRoutes(app) {

    app.get("/get-brand-profile",authJWT,(req, res)=> {
        getProfile(req, res);
    });

    // app.patch("/update-profile", authJWT,(req, res)=> {
    //     updateprofile(req, res);
    // });
    
    // app.patch("/add-address",authJWT,(req, res)=> {
    //     add_address(req, res);
    // });

}


module.exports = {
    brandRoutes,
};