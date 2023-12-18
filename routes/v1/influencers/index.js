const Router = require("router");
const { authJWT } = require("../../../middlewares/verify_token");

const router = Router();

const auth = require("../influencers/auth");
const profile = require("../influencers/profile");
const address = require("../influencers/address");
const campaigns = require("../influencers/campaigns");

router.use("/auth", auth);
router.use("/profile", authJWT, profile);
router.use("/address", authJWT, address);
router.use("/campaigns", authJWT, campaigns);

module.exports = router;
