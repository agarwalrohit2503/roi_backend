const tableNames = require("../../../../utils/table_name");
const { db, sequelize } = require("../../../../utils/conn");
var jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

async function influencerLogin(req, res) {
  const mobile_number = req.body.mobile_number;
  const vcode = uuidv4();
  console.log(vcode);

  let SqlQuery = await tableNames.influencer.findOne({
    where: { number: mobile_number },
  });

  if (!SqlQuery) {
    const otpnum = Math.floor(1000 + Math.random() * 9000);

    // const verificationCode = Math.floor(1000 + Math.random() * 900000);
    const UserOtp = await tableNames.otp.create({
      verification_code: vcode,
      otp_code: otpnum,
      influencer_id: 0,
      number: mobile_number,
    });

    if (UserOtp === 0) {
      res.status(404).send({
        status: 404,
        message: "Otp not send",
      });
    } else {
      res.status(200).send({
        status: 200,
        message: "successfully login",
        user_details: [
          {
            verification_code: UserOtp["verification_code"],
          },
        ],
      });
    }
  } else {
    //try {

    var data = SqlQuery.toJSON();

    console.log(data);
    console.log(mobile_number);
    console.log(data["influencer_id"]);
    if (data["account_delete"] == 1) {
      res.status(404).send({
        status: 404,
        message: "you account has been deactivated",
      });
    } else {
      const otpnum = Math.floor(1000 + Math.random() * 9000);
      //  const verificationCode = Math.floor(1000 + Math.random() * 900000);

      const UserOtp = await tableNames.otp.create({
        verification_code: vcode,
        otp_code: otpnum,
        influencer_id: data["influencer_id"],
        number: mobile_number,
      });

      if (UserOtp === 0) {
        res.status(404).send({
          status: 404,
          message: "Otp not send",
        });
      } else {
        res.status(200).send({
          status: 200,
          // "isuserfound": true,

          message: "successfully login",
          //  user_details: [
          //  {
          //"profile_status": data['profile_status'],
          verification_code: UserOtp["verification_code"],
          //  },
          // ],
        });
      }
    }
  }
}

module.exports = {
  influencerLogin,
  //brandLogin,
  // otpverify,
};
