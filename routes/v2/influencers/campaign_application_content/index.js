const express = require("express");
const router = express.Router();

const {
  campaignApplicationInfluencerContent,
  getApplicationInfluencerContent
} = require("../../../../controllers/v2/influencer/campaign_application_content/campaign_application_content.controller.js");

router.post("/content-upload/:campaign_applied_id", (req, res) => {
  campaignApplicationInfluencerContent(req, res);
});

router.get("/get-application-influencer-content/:campaign_applied_id", (req, res) => {
  getApplicationInfluencerContent(req, res);
});

module.exports = router;
