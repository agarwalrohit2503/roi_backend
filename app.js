const express = require('express');
const bodyParser = require("body-parser");
var cors = require('cors');
const path = require('path');
// const {db,sequelize} = require('../roi-Backend/utils/conn');


const { influencerRoutes } = require('./routes/influencer_users.routes');
const {otpRoutes}  = require('./routes/otp.routes');
const {influencerPriceRoutes} = require('./routes/influencer_price.routes');
const {contentNicheRoutes}=require('./routes/content_niche.routes');
const  {stateRoutes} = require('./routes/state.routes'); 
const dotenv = require('dotenv').config(
  { path: path.resolve(process.cwd(), '.env'), }
);

let port = process.env.PORT || 8000;
const app = express();
//console.log(process.env.HOST);
app.use(cors())
app.use(express.json(
  {
    limit: "5000mb",
    extended: true,
    parameterLimit: 50000

  }
));


app.listen(port, () => {
    console.log(`server is running at ${port}`);
  });

  
app.get("/", (req, res) => res.send("Welcome to ROI-Project backend APIs"));




influencerRoutes(app);
influencerPriceRoutes(app);
contentNicheRoutes(app);
otpRoutes(app);
stateRoutes(app);
module.exports = app;