const express = require("express");
const router = express.Router();
const {
  campaignBudgeting,
} = require("../../../../controllers/v2/brands/budgeting/budgeting.controller");

router.get("/get", (req, res) => {
  campaignBudgeting(req, res);
});

module.exports = router;
