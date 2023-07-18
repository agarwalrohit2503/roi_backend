const tableNames = require("../../../utils/table_name");
const {db,sequelize} = require('../../../utils/conn');
var jwt = require('jsonwebtoken');


async function influencerLogin(req,res) {
   
  
//     const name = req.body.name;
//     const email = req.body.email;
//     const gender = req.body.gender;
    const mobile_number = req.body.mobile_number ; 
//     const city_id = req.body.city_id;
//     const state_id = req.body.state_id;
//     const dob = req.body.dob;
//     const country = req.body.country;
//     const pan_card = req.body.pan_card;
//     const gst_number = req.body.gst_number;
//     const bio = req.body.bio;
 
 let SqlQuery = await  tableNames.influencer_users.findOne(
   { where: { number: mobile_number, } }
   );
  
    if (!SqlQuery) {
 
//      const secretKeygen = Math.floor(10000 + Math.random() * 90000);
//      let userinfo = {
//          city_id:city_id,
//          state_id:state_id, 
//          name:name,
//          email:email,
//          gender:gender,  
//          number:number,
//          dob:dob,
//          country:country, 
//           pan_card:pan_card,
//           gst_number:gst_number,
//           bio:bio,
//           secret_key: secretKeygen
//        } 
//        const user = await tableNames.influencer_users.create(userinfo) 
//        if (user) {
//          console.log(user);
//          const privatekey =  process.env.privateKey; //'harshguptatesttestharshharshguptatesttestharsh'; //process.env.privateKey;
//          let params = {    
//            number: user['number'],
//          }
//          const token = await jwt.sign(params, privatekey, { expiresIn: '365d' })
//          console.log(token);
//          const otpCreated = Math.floor(1000 + Math.random() * 9000);
//          const otpInserted = await tableNames.otp.create(
//            {
//              otp_code: otpCreated,
//              influencer_id	: user['influencer_id']
//            }
//          )
//          if (otpInserted === 0) {
//            res.status(404).send(
//              {
//                "status": 404,
//                "message": "Otp not send",
//              }
//            );
//          }
//          else {
//            res.status(200).send({
//              "status": 200,
//              "isuserfound": false,
//              "message": "successfully register",
//              "user_details": [{
//                "influencer_id": user['influencer_id'],
//                "profile_status": user['profile_status'],
//                "token": token,
//                "secret_key": secretKeygen,
//              }]
//            })
//          } 
//      }


const otpnum = Math.floor(1000 + Math.random() * 9000);

const verificationCode = Math.floor(1000 + Math.random() * 900000);
const UserOtp = await tableNames.otp.create(
  {
    verification_code:verificationCode,
    otp_code: otpnum,
    influencer_id: 0,
    number:mobile_number,
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
    "message": "successfully login",
    "user_details": [{
        "verification_code":UserOtp['verification_code'],
    }]
  })
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
      //  const privatekey = process.env.privateKey;
      //  let params = {
      //    number: data['number'],
      //  }
      // const token = await jwt.sign(params, privatekey, { expiresIn: '365d' })
       
       const otpnum = Math.floor(1000 + Math.random() * 9000);

       const verificationCode = Math.floor(1000 + Math.random() * 900000);
       const UserOtp = await tableNames.otp.create(
         {
           verification_code:verificationCode,
           otp_code: otpnum,
           influencer_id: data['influencer_id'],
           number:mobile_number,
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
          // "isuserfound": true,
          
           "message": "successfully login",
           "user_details": [{
               "profile_status": data['profile_status'],
               "verification_code":UserOtp['verification_code'],
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

// async function brandLogin(req,res) {
//     const city_id           = req.body.city_id;
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
   
   
//     // const dob = req.body.dob;
//     // const country = req.body.country;
   
 
 
//  let SqlQuery = await  tableNames.brands.findOne(
//    { where: { number: number, } }
//    );
  
//    if (!SqlQuery) {
 
//      const secretKeygen = Math.floor(10000 + Math.random() * 90000);
 
//      let userinfo = {
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
   
//        const user = await tableNames.brands.create(userinfo)
   
//        if (user) {
 
//          console.log(user);
 
//          const privatekey =  process.env.privateKey; //'harshguptatesttestharshharshguptatesttestharsh'; //process.env.privateKey;
//          let params = {    
//            number: user['number'],
//          }
//          const token = await jwt.sign(params, privatekey, { expiresIn: '365d' })
//          console.log(token);
   
//          const otpCreated = Math.floor(1000 + Math.random() * 9000);
//          const otpInserted = await tableNames.otp.create(
//            {
//              otp_code: otpCreated,
//              brand_id	: user['brands_id']
//            }
//          )
   
//          if (otpInserted === 0) {
//            res.status(404).send(
//              {
//                "status": 404,
//                "message": "Otp not send",
//              }
//            );
//          }
//          else {
//            res.status(200).send({
//              "status": 200,
//              "isuserfound": false,
//              "message": "successfully register",
//              "user_details": [{
//                "influencer_id": user['influencer_id'],
//                "profile_status": user['profile_status'],
//                "token": token,
//                "secret_key": secretKeygen,
//              }]
//            })
//          } 
//      }
 
//  }else{
//    try {
//      var data = SqlQuery.toJSON();
   
//      if (data['account_delete'] == 1) {
//        res.status(404).send(
//          {
//            "status": 404,
//            "message": "you account has been deactivated",
//          }
//        );
//      } else {
//        const privatekey = process.env.privateKey;
//        let params = {
//          number: data['number'],
//        }
//        const token = await jwt.sign(params, privatekey, { expiresIn: '365d' })
       
//        const otpnum = Math.floor(1000 + Math.random() * 9000);
//        const UserOtp = await tableNames.otp.create(
//          {
//            otp_code: otpnum,
//            brand_id: data['brands_id']
//          })
 
//        if (UserOtp === 0) {
//          res.status(404).send(
//            {
//              "status": 404,
//              "message": "Otp not send",
//            }
//          );
//        } else {
        
//          res.status(200).send({
//            "status": 200,
//            "isuserfound": true,
//            "message": "successfully login",
//            "brands_details": [{
//              "brands_id": data['brands_id'],
//                "profile_status": data['profile_status'],
//                "token": token,
//                "secret_key": data['secret_key'],
//            }]
//          })
//        }
//      }
 
//    } catch (error) {
//      res.status(500).send({
//        "status": 500,
//        "message": "server internal error",
       
//      })
//    }
//    }
 
// }
async function otpverify(req,res) {
  
  const otp              = req.body.otp;
  const verification_code = req.body.verification_code;
 // const influencer_id    = req.body.influencer_id;
  //const brand_id         = req.body.brand_id;


const sqlQuery = `SELECT * FROM ${tableNames.otps} WHERE otp_code = ${otp}  and verification_code = ${verification_code}`;
var result = await sequelize.query(sqlQuery, { type: sequelize.QueryTypes.SELECT,},)
if (result.length != 0) {
  if(result[0]['otp_flag'] == 1)
  {
    res.status(404).send(
    { 
      "status":404, 
      "message":"Otp already verified", 
    }
    );
  }else{
   const otpId = result[0]['otp_id'];
  const influenceChecker = result[0]['influencer_id'];
  const number           = result[0]['number'];

  if(influenceChecker == 0){

   const secretKeygen = Math.floor(10000 + Math.random() * 90000);
     let userinfo = {
    
         number:number,
          secret_key: secretKeygen
       } 
       const user = await tableNames.influencer_users.create(userinfo) 
       if (user) {
        var data = user.toJSON(); 
  
      const  inf_id =  data['influencer_id'];

               const privatekey =  process.env.privateKey;
              
         let params = {           
           influencer_id:inf_id,
           number: user['number'],
         }
         const token = await jwt.sign(params, privatekey, { expiresIn: '10d' })
      

        let tokeninfo = {
          influencer_id:inf_id,
          number:number,
          gen_token:token,
        } 
       const sqlquery = await tableNames.gen_token.create(tokeninfo)
       if(!sqlquery){
        res.status(400).send({
          "status": 400,
          "message": "token not generated",
        });
       }else{

        var tokensql = sqlquery.toJSON(); 
        console.log(tokensql['gen_token']);

       const sqlQuery1 = `SELECT * FROM ${tableNames.influencer_user} WHERE influencer_id = ${inf_id} `;
      
       
     
      var result1 = await sequelize.query(sqlQuery1, { type: sequelize.QueryTypes.SELECT,})
      if(!result1){
        res.status(400).send({
          "status": 400,
          "message": "Influencer not found",
        });
      }else{

      

        const updateQuery= `UPDATE otp SET  otp_flag = 1 WHERE otp_id = ${otpId}`;
  var result = await sequelize.query(updateQuery, { type: sequelize.QueryTypes.UPDATE,},)
      if(result.length != 0){  
        res.status(200).send(
          { 
            "status":200,
            "message":"Otp verified successfully",       
            "data":[
              { 
                "influencer_id":  data['influencer_id'],
          "secret_key":  data['secret_key'],
          "token":tokensql['gen_token'],
             }]      
          });
    }else{ 
      res.status(404).send(
        { 
          "status":404,
          "message":"Otp not verified",             
        });
    }
      }
       }
       }

  }else{
 
  const sqlQuery2 = `SELECT * FROM ${tableNames.otps} WHERE otp_code = ${otp} and verification_code = ${verification_code}`;
  var sqlquery = await sequelize.query(sqlQuery2, { type: sequelize.QueryTypes.SELECT,})
  if (sqlquery.length1 != 0) {

  

    const sqlQuery1 = `SELECT * FROM ${tableNames.influencer_user} WHERE influencer_id = ${influenceChecker}`;
    var result1 = await sequelize.query(sqlQuery1, { type: sequelize.QueryTypes.SELECT,})
   
    const sqlQuery3 = `SELECT * FROM ${tableNames.genToken} WHERE influencer_id = ${influenceChecker}`;
    var result3 = await sequelize.query(sqlQuery3, { type: sequelize.QueryTypes.SELECT,})

    if(!result1){
      res.status(400).send({
        "status": 400,
        "message": "Influencer not found",
      });
    }else{

  const updateQuery= `UPDATE otp SET  otp_flag = 1 WHERE otp_id = ${otpId}`;
  var result = await sequelize.query(updateQuery, { type: sequelize.QueryTypes.UPDATE,},)
      if(result.length != 0){  
        res.status(200).send(
          { 
            "status":200,
            "message":"Otp verified successfully",       
            "data":[
              { 
               "influencer_id":  result1[0]['influencer_id'],
               "secret_key":  result1[0]['secret_key'],
               "token":result3[0]['gen_token'],
             }]      
          });
    }else{ 
      res.status(404).send(
        { 
          "status":404,
          "message":"Otp not verified",             
        });
    } 
    }
  }else{
    res.status(400).send({
      "status": 400,
      "message": "Otp not match",
    });
  }
  }
  // const updateQuery= `UPDATE otp SET  otp_flag = 1 WHERE otp_id = ${otpid}`;
  // var result = await sequelize.query(updateQuery, { type: sequelize.QueryTypes.UPDATE,},)
  //     if(result.length != 0){  
  //       res.status(200).send(
  //         { 
  //           "status":200,
  //           "message":"Otp verified successfully",             
  //         });
  //   }else{ 
  //     res.status(404).send(
  //       { 
  //         "status":404,
  //         "message":"Otp not verified",             
  //       });
  //   }
}
} else {
  res.status(400).send({
    "status": 400,
    "message": "Otp not match",
  });
}
}
 module.exports = {
    influencerLogin,
    //brandLogin,
    otpverify
  }