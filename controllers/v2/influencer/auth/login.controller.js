const tableNames = require("../../../../utils/table_name");
const { db, sequelize } = require("../../../../utils/conn");
var jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const otpTimeValidation =require("../../../../utils/otp_time_checker");
async function influencerLogin(req, res) {
    
  const mobile_number = req.body.mobile_number;
  const vcode = uuidv4();
  console.log(vcode);

  let SqlQuery = await tableNames.influencer.findOne({
    where: { number: mobile_number },
  });

  if (!SqlQuery) {
    const UserOtp = await tableNames.otp.create({
      verification_code: vcode,
      otp_code: 1111,
      influencer_id: null,
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
        verification_code: UserOtp["verification_code"],
      });
    }
  } else {
    //try {

    var data = SqlQuery.toJSON();

    if (data["account_delete"] == 1) {
      res.status(404).send({
        status: 404,
        message: "you account has been deactivated",
      });
    } else {
      const UserOtp = await tableNames.otp.create({
        verification_code: vcode,
        otp_code: 1111,
        influencer_id: data["influencer_id"],
        number: mobile_number,
      });

      if (UserOtp === 0) {
        res.status(404).send({
          status: 404,
          message: "Otp not send",
        });
      } else {
        const findall = await tableNames.influencerProfileStatus.findAll({
          where: {
            influencer_id: data["influencer_id"],
          },
        });
        if (findall == "") {
          const ProfileStatusFind =
            await tableNames.influencerProfileStatus.create({
              influencer_id: data["influencer_id"],
            });

          if (!ProfileStatusFind) {
            res.status(404).send({
              status: 404,
              message: "try again to login",
            });
          } else {
            res.status(200).send({
              status: 200,
              message: "successfully login",
              verification_code: UserOtp["verification_code"],
            });
          }
        } else {
          res.status(200).send({
            status: 200,
            message: "successfully login",
            verification_code: UserOtp["verification_code"],
          });
        }
      }
    }
  }
}

async function otpverify(req, res) {
 
  var otp = req.body.otp;
  var verification_code = req.body.verification_code;
  let otpquery = await tableNames.otp.findOne({
    where: {
      otp_code: otp,
      verification_code: verification_code,
    },
  });
  var otpTimestamp = otpquery["createdAt"];

var isExpired =await otpTimeValidation(otpTimestamp);

if (isExpired) {
  console.log("OTP has expired");
  res.status(410).send({
    status: 410,
    message: "OTP has expired",
  });
} else {
   if (otpquery == null) {
    res.status(404).send({
      status: 404,
      message: "otp not match",
    });
  } else {
    if (otpquery["otp_flag"] == 1) {
      res.status(404).send({
        status: 404,
        message: "Otp already verified",
      });
    } else {
      if (otpquery["influencer_id"] == null) {
        number = otpquery["number"];
        let userinfo = {
          number: number,
       
        };
        const user = await tableNames.influencer.create(userinfo);
        console.log(user);
        if (!user) {
          res.status(404).send({
            status: 404,
            message: "error",
          });
        } else {
          var data = user.toJSON();
          const inf_id = data["influencer_id"];
          const user_number = data["number"];

          const privatekey = process.env.privateKey;
          let params = {
            influencer_id: inf_id,
            number: user_number,
            brandlog: false,
          };
          const token = await jwt.sign(params, privatekey, {
            expiresIn: "10d",
          });
          let tokeninfo = {
            influencer_id: inf_id,
            number: user_number,
            access_tokens: token,
          };
          const sqlquery = await tableNames.access_tokens.create(tokeninfo);
          if (!sqlquery) {
            res.status(400).send({
              status: 400,
              message: "token not generated",
            });
          } else {
            //  otp_flag = 1 WHERE otp_id = ${otpId}
            const updateQuery = await tableNames.otp.update(
              {
                otp_flag: 1,
              },
              {
                where: {
                  otp_id: otpquery["otp_id"],
                },
              }
            );
            if (!updateQuery) {
              res.status(400).send({
                status: 400,
                message: "Otp not verified",
              });
            } else {
              res.status(200).send({
                status: 200,
                message: "Otp verified successfully",

                influencer_id: inf_id,
                profile_status: 0,
                token: sqlquery["access_tokens"],
              });
            }
          }
        }
      } else {
        // need to pass token and id

        let influencerQuery = await tableNames.influencer.findOne({
          include: [
            {
              model: tableNames.influencerProfileStatus,
              required: false,
            },
          ],
          where: {
            influencer_id: otpquery["influencer_id"],
          },
        });
        if (!influencerQuery) {
          res.status(404).send({
            status: 404,
            message: "user not found",
          });
        } else {
          const influencer_id = influencerQuery["influencer_id"];
          const number = influencerQuery["number"];

          const privatekey = process.env.privateKey;
          let params = {
            influencer_id: influencer_id,
            number: number,
            brandlog: false,
          };
          const token = await jwt.sign(params, privatekey, {
            expiresIn: "10d",
          });
          let tokeninfo = {
            influencer_id: influencer_id,
            number: number,
            access_tokens: token,
          };
          const sqlquery = await tableNames.access_tokens.create(tokeninfo);
          if (!sqlquery) {
            res.status(400).send({
              status: 400,
              message: "token not generated",
            });
          } else {
            const updateQuery = await tableNames.otp.update(
              {
                otp_flag: 1,
              },
              {
                where: {
                  otp_id: otpquery["otp_id"],
                },
              }
            );
            if (!updateQuery) {
              res.status(400).send({
                status: 400,
                message: "Otp not verified",
              });
            } else {
              console.log(influencerQuery);
              res.status(200).send({
                status: 200,
                message: "Otp verified successfully",
                influencer_id: influencer_id,
                profile_status:
                  influencerQuery["influencer_profile_statuses"][0][
                    "profile_complete_status"
                  ],
                token: sqlquery["access_tokens"],
              });
            }
          }
        }
      }
    }
  }
}

 
}
module.exports = {
  influencerLogin,
  //brandLogin,
  otpverify,
};
