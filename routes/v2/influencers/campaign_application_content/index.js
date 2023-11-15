const express = require("express");
const router = express.Router();

const {
  campaignApplicationInfluencerContent,
} = require("../../../../controllers/v2/influencer/campaign_application_content/campaign_application_content.controller.js");

router.post("/campaign-influencer-content/:influencer_id", (req, res) => {
  campaignApplicationInfluencerContent(req, res);
});

module.exports = router;