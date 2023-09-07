const express = require("express");
const router = express.Router();
const {
  get,
  update,
} = require("../../../../controllers/v2/brands/campaign_applications/campaign_applications.controller.js");

router.get("/get/:campaign_id", (req, res) => {
  get(req, res);
});

router.patch("/update/:campaign_id", (req, res) => {
  update(req, res);
});

module.exports = router;
