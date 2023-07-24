const Router = require("router");
const {authJWT} = require("../../middlewares/verify_token");
const router = Router();
const influencers = require('./influencers');
const resources = require("../resources");

// const profile = require('./profile');
// const address = require('./address');
// const campaigns = require('./campaigns');


router.use("/resources", authJWT, resources);
router.use("/influencers", influencers);
// router.use("/profile", authJWT,profile);
// // router.use("/address", authJWT,address);
// // router.use("/campaigns", authJWT,campaigns);

module.exports = router;
