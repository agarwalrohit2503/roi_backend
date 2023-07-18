
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

async function updateBrandprofile(req, res){
  brand_id = req.params.brand_id;

  brand_logo = req.body.brand_logo;
  brand_type_id = req.body.brand_type_id;
  //gender= req.body.gender;
  Name = req.body.name;
  email= req.body.email;
  number= req.body.number;
 
 
  pan_card= req.body.pan_card;
  gst_number= req.body.gst_number;
  website= req.body.website;
  address =req.body.address;
  overview= req.body.overview;
  city_id= req.body.city_id;
  state_id= req.body.state_id;
  profile_status = 1;
  const sqlQuery = `
  UPDATE ${tableNames.brand} SET 
  city_id= '${city_id}', 
  state_id= '${state_id}', 
  brand_type_id='${brand_type_id}',
  brand_logo='${brand_logo}',
  name= '${Name}', 
  email= '${email}', 
  number= '${number}', 
  gst_number= '${gst_number}', 
  website='${website}', 
  pan_card='${pan_card}', 
  address='${address}', 
  overview= '${overview}',
  profile_status='${profile_status}'
   WHERE 	brands_id =${brand_id}`;

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
//no needed
// async function addbrand(req, res){

//       const city_id           = req.body.city_id;
//     const state_id          = req.body.state_id;
//     const brand_type_id     = req.body.brand_type_id;
//     const brand_logo        = req.body.brand_logo;
//     const name              = req.body.name;
//     const email             = req.body.email;
//     const number            = req.body.number; 
//     const gst_number        = req.body.gst_number;
//     const website           = req.body.website;
//     const pan_card          = req.body.pan_card;
//     const adds              = req.body.address;
//     const overview          = req.body.overview;

//        let userinfo = {
//          city_id           : city_id,
//          state_id          : state_id,
//          brand_type_id     : brand_type_id,
//          brand_logo        : brand_logo,
//          name              : name,
//          email             : email,
//          number            : number, 
//          gst_number        : gst_number,
//          website           : website,
//          pan_card          : pan_card,
//          address            : adds,
//          overview          : overview,
//           secret_key: secretKeygen
//        }
//        const user = await tableNames.brands.create(userinfo);

//        if (user) {

//        }else{

//        }

// }//no needed
module.exports = {
  getProfile,
  //addbrand,
  updateBrandprofile
//   updateprofile,
//   add_address
}