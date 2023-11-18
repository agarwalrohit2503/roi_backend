const express = require("express");
const router = express.Router();

const {
  addComments,
  addNotes,
  getBrandsComments,
  deleteComments,
} = require("../../../../controllers/comments/comments.controller");

router.post("/add", (req, res) => {
  addComments(req, res);
});

router.get("/get/:campaign_applied_id/:influencer_id", (req, res) => {
  getBrandsComments(req, res);
});

router.delete("/delete/:comment_id", (req, res) => {
  deleteComments(req, res);
});

router.post("/add-notes/:campaign_applied_id", (req, res) => {
  addNotes(req, res);
});

module.exports = router;
