const express = require("express");
const router = express.Router();

const {
  addComments,
  getComments,
  deleteComments,

} = require("../../../../controllers/v2/influencer/comments/comments.controller");

router.post("/add/:campaign_id", (req, res) => {
  addComments(req, res);
});

router.get("/get/:campaign_id", (req, res) => {
  getComments(req, res);
});

router.delete("/delete/:campaign_id", (req, res) => {
  deleteComments(req, res);
});


module.exports = router;