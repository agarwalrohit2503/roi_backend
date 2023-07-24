const express = require("express");
const router = express.Router();
const {
  addAddress,
  getAddress,
  deleteAddress,
  editAddress
} = require("../../../../controllers/v2/influencer/address/address.controller");

router.post("/add/:influencer_id", (req, res) => {
  addAddress(req, res);
});
router.get("/get/:influencer_id", (req, res) => {
  getAddress(req, res);
});
router.delete("/delete/:influencer_id", (req, res) => {
  deleteAddress(req, res);
});
router.patch("/edit/:influencer_id", (req, res) => {
  editAddress(req, res);
});
module.exports = router;
