const express = require("express");
const router = express.Router();
const {
  getCampaigns,
  getCampaignDetails,
  addCampaigns,
  getDemoCampaigns,
  getCampaignApplications,
} = require("../../../../controllers/v2/influencer/campaigns/campaigns.controller");

router.get("/get", (req, res) => {
  getCampaigns(req, res);
});

router.get("/details/:campaign_id", (req, res) => {
  getCampaignDetails(req, res);
});

router.post("/add-campaigns", (req, res) => {
  addCampaigns(req, res);
});

router.get("/demo", (req, res) => {
  getDemoCampaigns(req, res);
});

router.get("/get-campaign-applications/:influencer_id", (req, res) => {
  getCampaignApplications(req, res);
});

module.exports = router;
