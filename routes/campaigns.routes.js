const {
    getCampaigns,
    getCampaignDetails,
    addCampaigns
} = require('../controllers/campaigns.controller');
const {authJWT} = require('../utils/tokenchecker');


function CampaignsRoutes(app) {
    app.get("/get-campaigns", authJWT,(req, res) => {
        getCampaigns(req, res);
    });

    app.get("/get-campaign-details/:campaign_id", authJWT,(req, res) => {
        getCampaignDetails(req, res);
    });

    app.post("/add-campaigns",authJWT,(req,res) =>{
        addCampaigns(req,res);
    });
}

module.exports = {
    CampaignsRoutes,
};