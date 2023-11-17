const express = require("express");
const router = express.Router();
const {
  getApplicationInfluencerContent,
} = require("../../../../controllers/v2/brands/campaign_application_content/campaign_application_content.controller.js");

router.get("/get-application-influencer-content/:campaign_applied_id", (req, res) => {
  getApplicationInfluencerContent(req, res);
});

router.patch("/influencer-content-approval/:campaign_applied_id", (req, res) => {
  campaignApplicationApproval(req, res);
});

module.exports = router;
