const tableNames = require("../utils/table_name");
const {db,sequelize} = require('../utils/conn');
async function otpverify(req,res) {
  
  const otp             = req.body.otp;
  const influencer_id   = req.body.influencer_id;
  const brand_id   = req.body.brand_id;


  const sqlQuery = `SELECT * FROM ${tableNames.otps} WHERE otp_code = ${otp}  
  ${influencer_id ? `and influencer_id = ${influencer_id}`: ""}
  ${brand_id ? `and brand_id = ${brand_id}`: ""}
  `;
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
  const otpid = result[0]['otp_id'];
  console.log(otpid);
  const updateQuery= `UPDATE otp SET  otp_flag = 1 WHERE otp_id = ${otpid}`;
  var result = await sequelize.query(updateQuery, { type: sequelize.QueryTypes.UPDATE,},)
      if(result.length != 0){  
        res.status(200).send(
          { 
            "status":200,
            "message":"Otp verified successfully",             
          });
    }else{ 
      res.status(404).send(
        { 
          "status":404,
          "message":"Otp not verified",             
        });
    }
}
} else {
  res.status(400).send({
    "status": 400,
    "message": "Otp not match",
  });
}
}
module.exports = {
    otpverify
}