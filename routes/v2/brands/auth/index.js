
const express = require("express");
const router = express.Router();
const {
    brandLogin,
    otpverify
   // brandLogin
} = require('../../../../controllers/v2/brands/auth/login.controller');


    router.post("/brand-login", (req, res)=> {
        brandLogin(req, res);
    });

    router.post("/otp-verify", (req, res ) => {
        otpverify(req, res);
    });



module.exports =  router;