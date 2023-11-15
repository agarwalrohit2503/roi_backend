const express = require("express");
const router = express.Router();
const {
  influencerLogin,
  otpverify,
  influencerSocialLogin,
} = require("../../../../controllers/v2/influencer/auth/login.controller");

router.post("/login", (req, res) => {
  influencerLogin(req, res);
  console.log("okk");
});

router.post("/otp-verify", (req, res) => {
  otpverify(req, res);
});

router.post("/social-login", (req, res) => {
  influencerSocialLogin(req, res);
});

module.exports = router;
