//  /brands

// /influences
var Router       = require('router');

const influencers = require('./influencers');

const router = Router();

router.use("/influencers", influencers);

module.exports = router;