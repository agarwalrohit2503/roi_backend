const Router = require("router");
const { authJWT } = require("../../../middlewares/verify_token");
const router = Router();
const auth = require("./auth");
 const profile = require("./profile");
 const influencer_routes = require("./influencer");
// const campaigns = require("./campaigns");

router.use("/auth", auth);
 router.use("/profile", authJWT, profile);
router.use("/influencer", authJWT, influencer_routes);
// router.use("/campaigns", authJWT, campaigns);

module.exports = router;
