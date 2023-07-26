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
    // const otpnum = Math.floor(1000 + Math.random() * 9000);

    // const verificationCode = Math.floor(1000 + Math.random() * 900000);
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

    // console.log(data);
    // console.log(mobile_number);
    // console.log(data["influencer_id"]);
    if (data["account_delete"] == 1) {
      res.status(404).send({
        status: 404,
        message: "you account has been deactivated",
      });
    } else {
      // const otpnum = Math.floor(1000 + Math.random() * 9000);
      //  const verificationCode = Math.floor(1000 + Math.random() * 900000);

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
async function otpverify(req, res) {
  const otp = req.body.otp;
  const verification_code = req.body.verification_code;
  let otpquery = await tableNames.otp.findOne({
    // attributes: [
    //   'configuration_id',
    //    'config_name',
    //    'config_value'],
    where: {
      otp_code: otp,
      verification_code: verification_code,
    },
  });

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
          // city_id: null,
          // state_id: null,
          // email: null,
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
                // data: [
                //   {
                influencer_id: inf_id,
                token: sqlquery["access_tokens"],
                //   },
                // ],
              });
            }
          }
        }
      } else {
        // need to pass token and id

        let influencerQuery = await tableNames.influencer.findOne({
          where: {
            influencer_id: otpquery["influencer_id"],
            //verification_code: verification_code,
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
              res.status(200).send({
                status: 200,
                message: "Otp verified successfully",
                influencer_id: influencer_id,
                token: sqlquery["access_tokens"],
              });
            }
          }

          // let tokenquery = await tableNames.access_tokens.findOne({
          //   where: {
          //     influencer_id : influencer_id ,
          //     verification_code: verification_code,
          //   },
          // });
          // res.status(200).send({
          //   status: 200,
          //   message: influencerQuery,
          // });
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
