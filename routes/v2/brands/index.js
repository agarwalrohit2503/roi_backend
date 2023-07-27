const Router = require("router");
const { authJWT } = require("../../../middlewares/verify_token");
const router = Router();
const auth = require("./auth");
const profile = require("./profile");
const influencer = require("./influencer");
const campaign = require("./campaign");
// const campaigns = require("./campaigns");

router.use("/auth", auth);
router.use("/profile", authJWT, profile);
router.use("/influencer", authJWT, influencer);
router.use("/campaign", authJWT, campaign);
// router.use("/campaigns", authJWT, campaigns);

module.exports = router;
