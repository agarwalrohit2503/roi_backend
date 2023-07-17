const {
    otpverify
} = require('../controllers/otp.controller');
const {authJWT} = require('../utils/tokenchecker');

function otpRoutes(app) {
    app.post("/otp-verify", authJWT,(req, res) => {
        otpverify(req, res);
});




}

module.exports = {
    otpRoutes,
};