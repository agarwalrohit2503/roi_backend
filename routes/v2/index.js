const Router = require("router");
const { authJWT } = require("../../middlewares/verify_token");
const router = Router();
const influencers = require("./influencers");
const resources = require("../resources");



router.use("/resources", authJWT, resources);
router.use("/influencers", influencers);


module.exports = router;
