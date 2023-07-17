// /auth ->
// /address -> 

const  Router       = require('router');

const router = Router();
const auth = require('./auth');
router.use("/auth", auth);

module.exports = router;