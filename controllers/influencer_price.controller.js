
const tableNames = require("../utils/table_name");
const {db,sequelize} = require('../utils/conn');
var jwt = require('jsonwebtoken');



async function updateprofile(req, res){
  influencer_id = req.body.influencer_id;

  Name = req.body.name;
  email= req.body.email;
  gender= req.body.gender;
  number= req.body.number;
  dob= req.body.dob;
  country= req.body.country;
  pan_card= req.body.pan_card;
  gst_number= req.body.gst_number;
  bio= req.body.bio;
  city_id= req.body.city_id;
  state_id= req.body.state_id;

  const sqlQuery = `
  UPDATE ${tableNames.influencer_user} SET city_id= '${city_id}', state_id= '${state_id}', name= '${Name}', email= '${email}', gender='${gender}', number= '${number}', dob= '${dob}', country= '${country}', pan_card='${pan_card}', gst_number= '${gst_number}', bio= '${bio}' WHERE influencer_id =${influencer_id}`;

  var result = await sequelize.query(sqlQuery, { type: sequelize.QueryTypes.UPDATE},)
if (result.length != 0) {
 
  res.status(200).send(
    { 
      "status":200, 
      "message":"profile updated", 
    }
    );
}else{
 
    res.status(404).send(
      { 
        "status":404, 
        "message":"profile not updated", 
      }
      );
}
}

async function add_influencer_price(req, res){
  influencer_id = req.body.influencer_id;
  address  = req.body.address;
  city_id  = req.body.city_id;
  state_id = req.body.state_id;
  pin = req.body.pin;
  country= req.body.country;
  const sqlQuery = `
  INSERT INTO ${tableNames.influencer_address} 
  ( influencer_id, address, country,city_id, state_id, pin )
   VALUES 
   ('${influencer_id}','${address}','${country}','${city_id}','${state_id}','${pin}')
  `;

  var result = await sequelize.query(sqlQuery, { type: sequelize.QueryTypes.INSERT},)
if (result.length != 0) {
 
  res.status(200).send(
    { 
      "status":200, 
      "message":"profile updated", 
    }
    );
}else{
 
    res.status(404).send(
      { 
        "status":404, 
        "message":"profile not updated", 
      }
      );
}
}

module.exports = {
  updateprofile,
  add_influencer_price
}