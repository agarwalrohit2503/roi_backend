const {
    getState
} = require('../controllers/state.controller');
const {authJWT} = require('../utils/tokenchecker');


function stateRoutes(app) {
    app.get("/get-state", authJWT,(req, res) => {
        getState(req, res);
});
}

module.exports = {
    stateRoutes,
};