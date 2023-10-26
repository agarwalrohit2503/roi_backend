const Router = require("router");
const { authJWT } = require("../../../middlewares/verify_token");
const router = Router();
const auth = require("./auth");
const profile = require("./profile");
const influencer = require("./influencer");
const campaign = require("./campaign");
const campaign_applications = require("./campaign_applications");
// const campaigns = require("./campaigns");
const comments = require("./comments");



router.use("/comments", authJWT, comments);
router.use("/auth", auth);
router.use("/profile", authJWT, profile);
router.use("/influencer", authJWT, influencer);
router.use("/campaign", authJWT, campaign);
router.use("/campaign_applications", authJWT, campaign_applications);

module.exports = router;
