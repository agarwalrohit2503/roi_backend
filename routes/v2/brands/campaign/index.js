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
  campaignLanguageDelete,
  campaignImageDelete,
  getCampaignImages,
  campaignDeliverablesDelete,
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

router.delete("/campaign-image-delete/:campaign_id", (req, res) => {
  campaignImageDelete(req, res);
});

router.get("/campaign-image/:campaign_id", (req, res) => {
  getCampaignImages(req, res);
});

router.delete(
  "/campaign-deliverables-delete/:campaign_deliverables_id",
  (req, res) => {
    campaignDeliverablesDelete(req, res);
  }
);
module.exports = router;
