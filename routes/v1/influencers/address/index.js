const express = require("express");
const router = express.Router();
const {
  add_address,
  getAddress,
  deleteAddress,
  editAddress
} = require("../../../../controllers/v1/influencer/address/address.controller");

router.post("/add/:influencer_id", (req, res) => {
  add_address(req, res);
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
