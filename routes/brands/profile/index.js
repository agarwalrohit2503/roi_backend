
const express = require("express");
const router = express.Router();
const {
    getProfile
} = require('../../../controllers/brands/profile/brand_user.controller');

router.get("/get-brand-profile/:brand_id",(req, res)=> {
    getProfile(req, res);
});

module.exports =  router;