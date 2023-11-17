const express = require("express");
const router = express.Router();
const {
  getApplicationInfluencerlinks,
} = require("../../../../controllers/v2/brands/campaign_application_link/campaign_application_link.controller.js");

router.get(
  "/get-application-influencer-links/:campaign_applied_id",
  (req, res) => {
    getApplicationInfluencerlinks(req, res);
  }
);

module.exports = router;
