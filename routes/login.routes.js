const {
    influencerLogin,
    brandLogin
   
} = require('../controllers/login.controller');

const {authJWT} = require("../utils/tokenchecker");

function loginRoutes(app) {

    app.post("/influencer-login", (req, res)=> {
        influencerLogin(req, res);
    });

    app.post("/brand-login", (req, res)=> {
        brandLogin(req, res);
    });
 
}


module.exports = {
    loginRoutes,
};