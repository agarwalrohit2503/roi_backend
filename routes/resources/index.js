//get states
//get cities
//get content niche
//get industry list
const express = require("express");
const router = express.Router();
const {
    GetContentNiche,
    getState,
    getCity
    
} = require('../../controllers/resources/resources.controller');

router.get("/get-content-niche",(req, res)=> {
    GetContentNiche(req, res);
});

router.get("/get-state",(req, res) => {
    getState(req, res);
});

router.get("/get-city",(req, res) => {
    getCity(req, res);
});

module.exports =  router;