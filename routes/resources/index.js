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
  getBrandType,
  getCampaignPaymentType,
  getPlatform,
  getCampaignGoal,
  getLanguageList,
  getCampaignBudgetList,
  targetAdienceAgeGroupLists,
  targetAudienceGenderLists,
  influencerTypeLists,
} = require("../../controllers/resources/resources.controller");

router.get("/get-content-niche", (req, res) => {
  getContentNiche(req, res);
});

router.get("/get-state", (req, res) => {
  getState(req, res);
});
router.get("/get-brand-type", (req, res) => {
  getBrandType(req, res);
});
router.get("/get-city", (req, res) => {
  getCity(req, res);
});

router.get("/get-business-list", (req, res) => {
  getBusinessList(req, res);
});

router.get("/get-campaign-payment-type", (req, res) => {
  getCampaignPaymentType(req, res);
});

router.get("/get-platform", (req, res) => {
  getPlatform(req, res);
});
router.get("/get-campaign-goal", (req, res) => {
  getCampaignGoal(req, res);
});

router.get("/get-languages", (req, res) => {
  getLanguageList(req, res);
});

router.get("/get-campaign-budget", (req, res) => {
  getCampaignBudgetList(req, res);
});

router.get("/target-adience-age-group", (req, res) => {
  targetAdienceAgeGroupLists(req, res);
});


router.get("/target-audience-gender", (req, res) => {
  targetAudienceGenderLists(req, res);
});



router.get("/influencer-type-list", (req, res) => {
  influencerTypeLists(req, res);
});

module.exports = router;
