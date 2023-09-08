const Router = require("router");
const { authJWT } = require("../../middlewares/verify_token");
const router = Router();
const influencers = require("./influencers");
const brands = require("./brands");
const resources = require("../resources");

router.use("/resources", authJWT, resources);
router.use("/influencers", influencers);
router.use("/brands", brands);

module.exports = router;
