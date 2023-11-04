const express = require("express");
const router = express.Router();

const {
  getCampaignNotes,
} = require("../../../../controllers/v2/influencer/campaign_notes/campaign_notes.controller");

router.get("/get/:influencer_id", (req, res) => {
  getCampaignNotes(req, res);
});

module.exports = router;