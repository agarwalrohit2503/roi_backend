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
const campaign_broadcast = require("./campaign_broadcast");
const budgeting = require("./budgeting");
// const campaign_content_approval = require("./campaign_content_approval");
const campaign_application_content = require("./campaign_application_content");
const campaign_application_link = require("./campaign_application_link");

router.use("/budgeting", authJWT, budgeting);
router.use("/comments", authJWT, comments);
router.use("/auth", auth);
router.use("/profile", authJWT, profile);
router.use("/influencer", authJWT, influencer);
router.use("/campaign", authJWT, campaign);
router.use("/campaign_applications", authJWT, campaign_applications);
router.use("/campaign_broadcast", authJWT, campaign_broadcast);
// router.use("/campaign_content_approval", authJWT, campaign_content_approval);

router.use(
  "/campaign_application_content",
  authJWT,
  campaign_application_content
);
router.use("/campaign_application_link", authJWT, campaign_application_link);
module.exports = router;
