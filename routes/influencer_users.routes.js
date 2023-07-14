const {
    login,
    getProfile,
    updateprofile,
    add_address
} = require('../controllers/influencer_users.controller');

const {authJWT} = require("../utils/tokenchecker");

function influencerRoutes(app) {

    // app.get("/test",(req,res)=> {
    //     console.log("okk");
    // })

    app.post("/login", (req, res)=> {
        login(req, res);
    });

    app.get("/get-influencer-profile",authJWT,(req, res)=> {
        getProfile(req, res);
    });

    app.patch("/update-profile", authJWT,(req, res)=> {
        updateprofile(req, res);
    });
    
    app.patch("/add-address",authJWT,(req, res)=> {
        add_address(req, res);
    });

}


module.exports = {
    influencerRoutes,
};