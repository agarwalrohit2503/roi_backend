const express = require("express");
const router = express.Router();
const {
  getAllCampaign,
  deleteCampaign,
  editCampaign,
  addCampaign,
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

module.exports = router;
