const express = require("express");
const router = express.Router();
const {
  campaignContentApproval,
} = require("../../../../controllers/v2/brands/campaign_content_approval/campaign_content_approval.js");

router.patch("/campaign-content/:comment_id", (req, res) => {
  campaignContentApproval(req, res);
});

module.exports = router;
