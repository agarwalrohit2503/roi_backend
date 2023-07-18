
const tableNames = require("../../../utils/table_name");
const {db,sequelize} = require('../../../utils/conn');
var jwt = require('jsonwebtoken');



async function getProfile(req,res){

    brands_id = req.params.brand_id;
 
  //console.log(uuid);

  const sqlQuery = `
  SELECT b.*,
  state.state_name,
  city.city_name,
  bnd_type.brand_type_name,
  industry.industry_name,
  brands_file.file_name,
  brands_file.link
  FROM ${tableNames.brand} as b
  
    LEFT JOIN ${tableNames.state} as state ON b.state_id  = state.state_id 
    LEFT JOIN ${tableNames.city}  as city ON b.city_id  = city.city_id
    LEFT JOIN ${tableNames.brand_type} as bnd_type ON b.brand_type_id  = bnd_type.brand_type_id
    LEFT JOIN  ${tableNames.brand_industry} as bndindt ON b.brands_id  = bndindt.brand_id
     LEFT JOIN  ${tableNames.industry} as  industry ON bndindt.industry_id  =  industry.industry_id
     LEFT JOIN ${tableNames.brands_file}  as brands_file ON b.brands_id  = brands_file.brand_id
  ${brands_id ? `where  b.brands_id  =  ${brands_id}` : ''}
  `;
  var result = await sequelize.query(sqlQuery, { type: sequelize.QueryTypes.SELECT},)
  if(result.length != 0){  
    res.status(200).send(
      { 
        "status":200,
        "message":"Your profile",           
        "data":result  
      });
  }else{ 
    res.status(404).send(
      { 
        "status":404,
        "message":"Influencer not found",             
      });
  }
} 

// async function updateprofile(req, res){
//   influencer_id = req.body.influencer_id;

//   Name = req.body.name;
//   email= req.body.email;
//   gender= req.body.gender;
//   number= req.body.number;
//   dob= req.body.dob;
//   country= req.body.country;
//   pan_card= req.body.pan_card;
//   gst_number= req.body.gst_number;
//   bio= req.body.bio;
//   city_id= req.body.city_id;
//   state_id= req.body.state_id;

//   const sqlQuery = `
//   UPDATE ${tableNames.influencer_user} SET city_id= '${city_id}', state_id= '${state_id}', name= '${Name}', email= '${email}', gender='${gender}', number= '${number}', dob= '${dob}', country= '${country}', pan_card='${pan_card}', gst_number= '${gst_number}', bio= '${bio}' WHERE influencer_id =${influencer_id}`;

//   var result = await sequelize.query(sqlQuery, { type: sequelize.QueryTypes.UPDATE},)
// if (result.length != 0) {
 
//   res.status(200).send(
//     { 
//       "status":200, 
//       "message":"profile updated", 
//     }
//     );
// }else{
 
//     res.status(404).send(
//       { 
//         "status":404, 
//         "message":"profile not updated", 
//       }
//       );
// }
// }

// async function add_address(req, res){
//   influencer_id = req.body.influencer_id;
//   address  = req.body.address;
//   city_id  = req.body.city_id;
//   state_id = req.body.state_id;
//   pin = req.body.pin;
//   country= req.body.country;
//   const sqlQuery = `
//   INSERT INTO ${tableNames.influencer_address} 
//   ( influencer_id, address, country,city_id, state_id, pin )
//    VALUES 
//    ('${influencer_id}','${address}','${country}','${city_id}','${state_id}','${pin}')
//   `;

//   var result = await sequelize.query(sqlQuery, { type: sequelize.QueryTypes.INSERT},)
// if (result.length != 0) {
 
//   res.status(200).send(
//     { 
//       "status":200, 
//       "message":"profile updated", 
//     }
//     );
// }else{
 
//     res.status(404).send(
//       { 
//         "status":404, 
//         "message":"profile not updated", 
//       }
//       );
// }
// }

module.exports = {
  getProfile,
//   updateprofile,
//   add_address
}