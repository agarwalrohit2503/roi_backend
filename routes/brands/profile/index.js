
const express = require("express");
const router = express.Router();
const {
    getProfile,
    updateBrandprofile
} = require('../../../controllers/brands/profile/brand_user.controller');

router.get("/get-brand-profile/:brand_id",(req, res)=> {
    getProfile(req, res);
});

router.patch("/update-brand-profile/:brand_id",(req, res)=> {
    updateBrandprofile(req, res);
});

module.exports =  router;