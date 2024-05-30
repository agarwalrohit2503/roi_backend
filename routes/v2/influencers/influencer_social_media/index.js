const express = require("express");
const router = express.Router();

const {
  addInfluencerSocialMediaDetails,
  addInfluencerYoutubeChannel,
  addInfluencerFacebookDetails,
  addInfluencerInstagramDetails,
  getInfluencerYoutubeChannel,
  getInfluencerFacebookAccount,
  getInfluencerInstagramAccount
} = require("../../../../controllers/v2/influencer/influencer_social_media/influencer_social_media.controller");

router.post("/add/:influencer_id", (req, res) => {
  addInfluencerSocialMediaDetails(req, res);
});

//CONNECT YOUTUBE ROUTES
router.post("/add_youtube/:influencer_id", (req, res) => {
  addInfluencerYoutubeChannel(req, res);
});
 
//CONNECT FACEBOOK ROUTES
router.post("/add_facebook/:influencer_id", (req, res) => {
  addInfluencerFacebookDetails(req, res);
});
//CONNECT INSTAGRAM ROUTES
router.post("/add_instagram/:influencer_id", (req, res) => {
  addInfluencerInstagramDetails(req, res);
});


//////////////find social account
router.get("/get_youtube/:influencer_id", (req, res) => {
  getInfluencerYoutubeChannel(req, res);
});

router.get("/get_facebook/:influencer_id", (req, res) => {
  getInfluencerFacebookAccount(req, res);
});
router.get("/get_instagram/:influencer_id", (req, res) => {
  getInfluencerInstagramAccount(req, res);
});

module.exports = router;
