//  /brands

// /influences
var Router = require("router");
const { authJWT } = require("../middlewares/verify_token");
const influencers = require("./influencers");
const brands = require("./brands");
const resources = require("./resources");
const router = Router();

router.use("/influencers", influencers);
router.use("/resources", authJWT, resources);
router.use("/brands", brands);
module.exports = router;
