const express = require("express");
const router = express.Router();
// const {
//     updateInfluencerPrice,
//     add_influencer_price
// } = require('../../../../controllers/v1/influencer/profile/influencer_price.controller');
// const {
//     AddContentNiche,
// } = require('../../../../controllers/v1/influencer/profile/content_niche.controller');
const {
  getProfile,
  updateProfile,
  updateInfluencerPrice,
  addContentNiche,
  influencerProfileUpdate,
  influencerProfileDelete,
} = require("../../../../controllers/v2/influencer/profile/profile.controller");

router.post("/add-content-niche/:influencer_id", (req, res) => {
  addContentNiche(req, res);
});
router.patch("/update-price/:influencer_id", (req, res) => {
  updateInfluencerPrice(req, res);
});

router.get("/details/:influencer_id", (req, res) => {
  getProfile(req, res);
});

router.patch("/update-details/:influencer_id", (req, res) => {
  updateProfile(req, res);
});
router.patch("/update-profile-status/:influencer_id", (req, res) => {
  influencerProfileUpdate(req, res);
});

router.delete("/delete-profile/:influencer_id", (req, res) => {
  influencerProfileDelete(req, res);
});
module.exports = router;
