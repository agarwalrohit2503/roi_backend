const express = require("express");
const router = express.Router();
const {
  getAllCampaign,
  deleteCampaign,
  editCampaign,
  addCampaign,
  getCampaignDetails,
  contentNicheDelete,
  platformDelete,
  campaignLanguageDelete
} = require("../../../../controllers/v2/brands/campaign/campaign");

router.get("/get/:brand_id", (req, res) => {
  getAllCampaign(req, res);
});

router.patch("/delete/:brand_id", (req, res) => {
  deleteCampaign(req, res);
});

router.patch("/edit/:brand_id", (req, res) => {
  editCampaign(req, res);
});

router.post("/add/:brand_id", (req, res) => {
  addCampaign(req, res);
});

router.get("/details/:campaign_id", (req, res) => {
  getCampaignDetails(req, res);
});

router.delete("/content-niche-delete/:campaign_id", (req, res) => {
  contentNicheDelete(req, res);
});

router.delete("/platform-delete/:campaign_id", (req, res) => {
  platformDelete(req, res);
});
router.delete("/campaign-language-delete/:campaign_id", (req, res) => {
  campaignLanguageDelete(req, res);
});

module.exports = router;
