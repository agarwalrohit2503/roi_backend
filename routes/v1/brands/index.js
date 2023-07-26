const  Router   = require('router');
const {authJWT} = require("../../../middlewares/verify_token");
const router = Router();
const auth = require('./auth');
const profile = require('./profile');
// const address = require('./address');
// const campaigns = require('./campaigns');



router.use("/auth", auth);
router.use("/profile", authJWT,profile);
// router.use("/address", authJWT,address);
// router.use("/campaigns", authJWT,campaigns);

module.exports = router;