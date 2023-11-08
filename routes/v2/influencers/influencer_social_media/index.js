const express = require("express");
const router = express.Router();

const {
  addInfluencerSocialMediaDetails,
} = require("../../../../controllers/v2/influencer/influencer_social_media/influencer_social_media.controller");

router.post("/add/:influencer_id", (req, res) => {
  addInfluencerSocialMediaDetails(req, res);
});

module.exports = router;
