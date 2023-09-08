const express = require("express");
const router = express.Router();

const {
  addComments,
  getinfluencerComments,

  deleteComments,
} = require("../../../../controllers/comments/comments.controller");

router.post("/add/", (req, res) => {
  addComments(req, res);
});

router.get("/get/:campaign_applied_id", (req, res) => {
  getinfluencerComments(req, res);
});

router.delete("/delete/:comment_id", (req, res) => {
  deleteComments(req, res);
});

module.exports = router;
