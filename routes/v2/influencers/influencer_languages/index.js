const express = require("express");
const router = express.Router();

const {
  addInfluencerLanguage,
  influencerLanguageDelete
} = require("../../../../controllers/v2/influencer/influencer_languages/influencer_languages.controller");

router.post("/add/:influencer_id", (req, res) => {
  addInfluencerLanguage(req, res);
});

router.delete("/delete/:influencer_id", (req, res) => {
  influencerLanguageDelete(req, res);
});

module.exports = router;