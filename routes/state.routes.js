const {
    getState,
    getCity
} = require('../controllers/state.controller');
const {authJWT} = require('../utils/tokenchecker');


function stateRoutes(app) {
    app.get("/get-state", authJWT,(req, res) => {
        getState(req, res);
    });

    app.get("/get-city", authJWT,(req, res) => {
        getCity(req, res);
    });
}

module.exports = {
    stateRoutes,
};