const express = require("express");
const router = express.Router();
const {
  getCampaigns,
  getCampaignDetails,
  applyCampaign,
  getCampaignApplications,
  campaignApplicationRemove,
} = require("../../../../controllers/v2/influencer/campaigns/campaigns.controller");

router.get("/get", (req, res) => {
  getCampaigns(req, res);
});

router.get("/details/:campaign_id", (req, res) => {
  getCampaignDetails(req, res);
});

router.get("/get-campaign-applications/:influencer_id", (req, res) => {
  getCampaignApplications(req, res);
});

router.post("/apply-campaign/:influencer_id", (req, res) => {
  applyCampaign(req, res);
});

router.delete("/campaign-application-remove/:influencer_id", (req, res) => {
  campaignApplicationRemove(req, res);
});

module.exports = router;
