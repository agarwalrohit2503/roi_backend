
const tableNames = require("../utils/table_name");
var jwt = require('jsonwebtoken');
// const {db,sequelize} = require('../utils/conn');
async function createInfluencer(req,res) {
   
   
    
   const number = req.body.number; 
   const city_id = req.body.city_id;
   const state_id = req.body.state_id;
   const category_id = req.body.category_id;
   const name = req.body.name;
   const email = req.body.email;
   const gender = req.body.gender;
   const photo =  req.body.photo;
   
   const dob = req.body.dob;
   const country = req.body.country;
   const address = req.body.address;
   const pan_card = req.body.pan_card;
   const gst_number = req.body.gst_number;
   const bio = req.body.bio;

let SqlQuery = await  tableNames.influencer_users.findOne({ where: { number: number, } });
  console.log(SqlQuery);
  if (!SqlQuery) {
    console.log("okk");
    const secretKeygen = Math.floor(10000 + Math.random() * 90000);

    let userinfo = {

        secret_key:secretKeygen,
        city_id:city_id,
        state_id:state_id,
        category_id:category_id,
        name:name,
        email:email,
        gender:gender,
        photo:photo,
        number:number,
        dob:dob,
        country:country,
        address:address,
         pan_card:pan_card,
         gst_number:gst_number,
         bio:bio,

        number: number,
        secret_key: secretKeygen
      }
  
      const user = await tableNames.User.create(userinfo)
  
      if (user) {
        const privatekey = process.env.privateKey; //'harshguptatesttestharshharshguptatesttestharsh';
        let params = {
          userEmail: user['userEmail'],
          userNumber: user['userNumber'],
        }
        const token = await jwt.sign(params, privatekey, { expiresIn: '365d' })
        console.log(token);
  
        const otpCreated = Math.floor(1000 + Math.random() * 9000);
        const otpInserted = await tableNames.Otp.create(
          {
            otp_code: otpCreated,
            user_id: user['user_id']
          })
  
        if (otpInserted === 0) {
          res.status(404).send(
            {
              "status": 404,
              "message": "Otp not send",
            }
          );
        }
        else {
          res.status(202).send({
            "status": 202,
            "isuserfound": false,
            "message": "successfully register",
            "user_details": [{
              "user_id": user['user_id'],
              "reseller_id": user['reseller_id'],
              "name": user['user_name'],
              "photo": user['user_photo'],
              "email": user['userEmail'],
              "password": user['userPassword'],
              "number": user['userNumber'],
              "city": user['usercity'],
              "state": user['userstate'],
  
              "user_active_status": user['user_delete_flag'],
              "token": token,
              "secret_key": secretKeygen,
            }]
          })
        } 
    }

}else{
    console.log("bad");
  }

}

module.exports = {
    createInfluencer,
}