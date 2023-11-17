const express = require("express");
const router = express.Router();

const {
  campaignApplicationInfluencerLink,
} = require("../../../../controllers/v2/influencer/campaign_application_link/campaign_application_link.js");

router.post("/influencer-work-link-upload/:campaign_applied_id", (req, res) => {
  campaignApplicationInfluencerLink(req, res);
});

module.exports = router;
