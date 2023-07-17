
const express = require("express");
const router = express.Router();
const {
    influencerLogin,
    otpverify
   // brandLogin
} = require('../../../controllers/login.controller');

const {authJWT} = require("../../../utils/tokenchecker");

    router.post("/influencer-login", (req, res)=> {
        influencerLogin(req, res);
    });
    router.post("/otp-verify",(req, res ) => {
        otpverify(req, res);
    });



module.exports =  router;