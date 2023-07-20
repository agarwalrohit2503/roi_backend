//get cities
//get content niche
//get industry list
const express = require("express");
const router = express.Router();
const {
  getContentNiche,
  getState,
  getCity,
  getBusinessList,
} = require("../../controllers/resources/resources.controller");

router.get("/get-content-niche", (req, res) => {
  getContentNiche(req, res);
});

router.get("/get-state", (req, res) => {
  getState(req, res);
});

router.get("/get-city", (req, res) => {
  getCity(req, res);
});

router.get("/get_business_list", (req, res) => {
  getBusinessList(req, res);
});

module.exports = router;
