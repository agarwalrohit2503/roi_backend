
const express = require("express");
const router = express.Router();
const {
    influencerLogin,
    otpverify

} = require('../../../controllers/influencer/auth/login.controller');


    router.post("/influencer-login", (req, res)=> {
        influencerLogin(req, res);
    });

    router.post("/otp-verify", (req, res ) => {
        otpverify(req, res);
    });



module.exports =  router;