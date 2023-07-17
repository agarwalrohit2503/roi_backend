// /auth ->
// /address -> 

const  Router       = require('router');
const {authJWT} = require("../../utils/tokenchecker");
const router = Router();
const auth = require('./auth');
const profile = require('./profile');

router.use("/auth", auth);
router.use("/profile", authJWT,profile);

module.exports = router;