const express = require("express");
const router = express.Router();
const {
  getDemoCampaigns,
} = require("../../../../../controllers/v2/influencer/campaigns/campaigns.controller");

router.get("/demo", (req, res) => {
  getDemoCampaigns(req, res);
});

module.exports = router;
