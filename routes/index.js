//  /brands

// /influences
var Router       = require('router');

const influencers = require('./influencers');
const brands = require('./brands');
const resources = require('./resources');
const router = Router();

router.use("/influencers", influencers);
router.use("/resources", resources);
router.use("/brands", brands);
module.exports = router;