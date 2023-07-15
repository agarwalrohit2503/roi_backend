
const tableNames = require("../utils/table_name");
const {db,sequelize} = require('../utils/conn');
var jwt = require('jsonwebtoken');

async function login(req,res) {
   
  
   const name = req.body.name;
   const email = req.body.email;
   const gender = req.body.gender;
   const number = req.body.number; 
   const city_id = req.body.city_id;
   const state_id = req.body.state_id;
   const dob = req.body.dob;
   const country = req.body.country;
   
   const pan_card = req.body.pan_card;
   const gst_number = req.body.gst_number;
   const bio = req.body.bio;

let SqlQuery = await  tableNames.influencer_users.findOne(
  { where: { number: number, } }
  );
 
  if (!SqlQuery) {

    const secretKeygen = Math.floor(10000 + Math.random() * 90000);

    let userinfo = {
        city_id:city_id,
        state_id:state_id, 
        name:name,
        email:email,
        gender:gender,  
        number:number,
        dob:dob,
        country:country, 
         pan_card:pan_card,
         gst_number:gst_number,
         bio:bio,
         secret_key: secretKeygen
      }
  
      const user = await tableNames.influencer_users.create(userinfo)
  
      if (user) {

        console.log(user);

        const privatekey =  process.env.privateKey; //'harshguptatesttestharshharshguptatesttestharsh'; //process.env.privateKey;
        let params = {    
          number: user['number'],
        }
        const token = await jwt.sign(params, privatekey, { expiresIn: '365d' })
        console.log(token);
  
        const otpCreated = Math.floor(1000 + Math.random() * 9000);
        const otpInserted = await tableNames.otp.create(
          {
            otp_code: otpCreated,
            influencer_id	: user['influencer_id']
          }
        )
  
        if (otpInserted === 0) {
          res.status(404).send(
            {
              "status": 404,
              "message": "Otp not send",
            }
          );
        }
        else {
          res.status(200).send({
            "status": 200,
            "isuserfound": false,
            "message": "successfully register",
            "user_details": [{
              "influencer_id": user['influencer_id'],
              "profile_status": user['profile_status'],
              "token": token,
              "secret_key": secretKeygen,
            }]
          })
        } 
    }

}else{
  try {
    var data = SqlQuery.toJSON();
  
    if (data['account_delete'] == 1) {
      res.status(404).send(
        {
          "status": 404,
          "message": "you account has been deactivated",
        }
      );
    } else {
      const privatekey = process.env.privateKey;
      let params = {
        number: data['number'],
      }
      const token = await jwt.sign(params, privatekey, { expiresIn: '365d' })
      
      const otpnum = Math.floor(1000 + Math.random() * 9000);
      const UserOtp = await tableNames.otp.create(
        {
          otp_code: otpnum,
          influencer_id: data['influencer_id']
        })

      if (UserOtp === 0) {
        res.status(404).send(
          {
            "status": 404,
            "message": "Otp not send",
          }
        );
      } else {
       
        res.status(200).send({
          "status": 200,
          "isuserfound": true,
          "message": "successfully login",
          "user_details": [{
            "influencer_id": data['influencer_id'],
              "profile_status": data['profile_status'],
              "token": token,
              "secret_key": data['secret_key'],
          }]
        })
      }
    }

  } catch (error) {
    res.status(500).send({
      "status": 500,
      "message": "server internal error",
      
    })
  }
  }

}

async function getProfile(req,res){

  influencer_id= req.query.influencer_id;
 
  //console.log(uuid);

  const sqlQuery = `
  SELECT i.*,
inf_price.post_cost,
inf_price.reels_cost,
inf_price.video_cost,
inf_price.story_cost,
state.state_name,
city.city_name,
cont_niche.content_niche_name,
inf_fb.influencer_facebook_id,
inf_insta.influencer_instagram_id,
inf_yt.influencer_youtube_id,
inf_adds.address,
inf_file.link,
inf_file.file_name
  FROM ${tableNames.influencer_user} as i 
  LEFT JOIN ${tableNames.influencer_price} as inf_price ON i.influencer_id  = inf_price.influencer_id 
  
   LEFT JOIN ${tableNames.influencer_address} as inf_adds ON i.influencer_id  = inf_adds.influencer_id
  LEFT JOIN ${tableNames.influencer_file} as inf_file ON i.influencer_id  = inf_file.influencer_id
  
  LEFT JOIN ${tableNames.influencer_facebook} as inf_fb ON i.influencer_id  = inf_fb.influencer_id
  LEFT JOIN ${tableNames.influencer_instagram} as inf_insta ON i.influencer_id  = inf_insta.influencer_id 
  LEFT JOIN ${tableNames.influencer_youtube} as inf_yt ON i.influencer_id  = inf_yt.influencer_id 
  
  
  LEFT JOIN ${tableNames.influencer_content_niche} as influencerniche ON i.influencer_id  = influencerniche.influencer_id   
  LEFT JOIN ${tableNames.content_niche} as cont_niche ON influencerniche.content_niche_id  = cont_niche.content_niche_id
  LEFT JOIN ${tableNames.state} as state ON i.state_id  = state.state_id 
  LEFT JOIN ${tableNames.city} as city ON i.city_id  = city.city_id 
  where  i.influencer_id =  ${influencer_id}
  `;
  var result = await sequelize.query(sqlQuery, { type: sequelize.QueryTypes.SELECT,},)
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

async function add_address(req, res){
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
  login,
  getProfile,
  updateprofile,
  add_address
}