const tableNames = require("../utils/table_name");
const {db,sequelize} = require('../utils/conn');
var jwt = require('jsonwebtoken');


async function influencerLogin(req,res) {
   
  
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
   //try {
   
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
 
//    } catch (error) {
//      res.status(500).send({
//        "status": 500,
//        "message": "server internal error",
       
//      })
//    }
   }
 
}

async function brandLogin(req,res) {
    const city_id           = req.body.city_id;
    const state_id          = req.body.state_id;
    const brand_type_id     = req.body.brand_type_id;
    const brand_logo        = req.body.brand_logo;
    const name              = req.body.name;
    const email             = req.body.email;
    const number            = req.body.number; 
    const gst_number        = req.body.gst_number;
    const website           = req.body.website;
    const pan_card          = req.body.pan_card;
    const adds              = req.body.address;
    const overview          = req.body.overview;
   
   
    // const dob = req.body.dob;
    // const country = req.body.country;
   
 
 
 let SqlQuery = await  tableNames.brands.findOne(
   { where: { number: number, } }
   );
  
   if (!SqlQuery) {
 
     const secretKeygen = Math.floor(10000 + Math.random() * 90000);
 
     let userinfo = {
         city_id           : city_id,
         state_id          : state_id,
         brand_type_id     : brand_type_id,
         brand_logo        : brand_logo,
         name              : name,
         email             : email,
         number            : number, 
         gst_number        : gst_number,
         website           : website,
         pan_card          : pan_card,
         address            : adds,
         overview          : overview,
          secret_key: secretKeygen
       }
   
       const user = await tableNames.brands.create(userinfo)
   
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
             brand_id	: user['brands_id']
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
           brand_id: data['brands_id']
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
           "brands_details": [{
             "brands_id": data['brands_id'],
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
 module.exports = {
    influencerLogin,
    brandLogin
  }