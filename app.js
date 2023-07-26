const express = require("express");
const bodyParser = require("body-parser");
const { swaggerServe, swaggerSetup } = require("./config");
var cors = require("cors");
const path = require("path");
// var Router = require('router')
//const routes = require("./routes");
const v2 = require("./routes/v2");
const v1 = require("./routes/v1");
// const {db,sequelize} = require('../roi-Backend/utils/conn');
// const { influencerRoutes } = require('./routes/influencers/auth/index');
// //const {otpRoutes}  = require('./routes/otp.routes');
// const {influencerPriceRoutes} = require('./routes/influencer_price.routes');
// const {contentNicheRoutes}=require('./routes/content_niche.routes');
// const  {stateRoutes} = require('./routes/state.routes');
// const {CampaignsRoutes} = require('./routes/campaigns.routes');
// // const {loginRoutes} = require('./routes/influencers/auth/');
// const {brandRoutes} =  require('./routes/brand_user.routes');
// const {wishlistRoutes} =require('./routes/favourite_influencer.routes');

const dotenv = require("dotenv").config({
  path: path.resolve(process.cwd(), ".env"),
});
// /api/v1 ==> Routes Folder

let port = process.env.PORT || 8000;
const app = express();
//console.log(process.env.HOST);
app.use(cors());
app.use(
  express.json({
    limit: "5000mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});

app.use("/api-docs", swaggerServe, swaggerSetup);
app.use("/v1", v1);
app.use("/v2", v2);

// influencerRoutes(app);
// influencerPriceRoutes(app);
// contentNicheRoutes(app);
// //otpRoutes(app);
// stateRoutes(app);
// CampaignsRoutes(app);
// // loginRoutes(app);
// brandRoutes(app);
// wishlistRoutes(app);
module.exports = app;
