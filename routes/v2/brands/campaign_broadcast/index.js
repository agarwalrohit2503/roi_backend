const express = require("express");
const router = express.Router();
const {
  addCampaignBroadcast,
} = require("../../../../controllers/v2/brands/campaign_broadcast/campaign_broadcast.controller");

router.post("/add/:brand_id", (req, res) => {
  addCampaignBroadcast(req, res);
});

module.exports = router;