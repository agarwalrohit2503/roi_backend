const Router = require("router");
const { authJWT } = require("../../../middlewares/verify_token");
const router = Router();

const auth = require("./auth");

const profile = require("./profile");

const address = require("./address");

const campaigns_Demo = require("./campaigns/demo");

const campaigns = require("./campaigns");
const comments = require("./comments");

router.use("/auth", auth);
router.use("/profile", authJWT, profile);
router.use("/address", authJWT, address);
router.use("/campaigns", authJWT, campaigns);
router.use("/comments", authJWT, comments);
router.use("/guest", campaigns_Demo);

module.exports = router;
