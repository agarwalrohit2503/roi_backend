const tableNames = require("../../../../utils/table_name");
const { db, sequelize } = require("../../../../utils/conn");
var jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

async function brandLogin(req, res) {
  const email = req.body.email;

  if (email != "") {
    let SqlQuery = await tableNames.brands.findOne({
      where: { email: email },
    });
    if (!SqlQuery) {
      const vvcode = uuidv4();
      const UserOtp = await tableNames.otp.create({
        verification_code: vvcode,
        otp_code: 1111,
        brand_id: null,
        //number: mobile_number,
        email: email,
      });

      if (UserOtp === 0) {
        res.status(404).send({
          status: 404,
          message: "Otp not send",
        });
      } else {
        res.status(200).send({
          status: 200,
          message: "email otp send",
          verification_code: UserOtp["verification_code"],
        });
      }
    } else {
      var data = SqlQuery.toJSON();
      if (data["account_delete"] == 1) {
        res.status(404).send({
          status: 404,
          message: "you account has been deactivated",
        });
      } else {
        // const otpnum = Math.floor(1000 + Math.random() * 9000);
        //  const verificationCode = Math.floor(1000 + Math.random() * 900000);
        const vvvcode = uuidv4();
        const UserOtp = await tableNames.otp.create({
          verification_code: vvvcode,
          otp_code: 1111,
          brand_id: data["brands_id"],
          // number: mobile_number,
          email: email,
        });

        if (UserOtp === 0) {
          res.status(404).send({
            status: 404,
            message: "email not send",
          });
        } else {
          res.status(200).send({
            status: 200,
            message: "email send login",
            verification_code: UserOtp["verification_code"],
          });
        }
      }
    }
  } else {
    const mobile_number = req.body.mobile_number;
    let SqlQuery = await tableNames.brands.findOne({
      where: { number: mobile_number },
    });
    if (!SqlQuery) {
      const vcode = uuidv4();
      const UserOtp = await tableNames.otp.create({
        verification_code: vcode,
        otp_code: 1111,
        brand_id: null,
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
      var data = SqlQuery.toJSON();
      console.log(data["brands_id"]);
      if (data["account_delete"] == 1) {
        res.status(404).send({
          status: 404,
          message: "you account has been deactivated",
        });
      } else {
        const vvcode = uuidv4();
        const UserOtp = await tableNames.otp.create({
          verification_code: vvcode,
          otp_code: 1111,
          brand_id: data["brands_id"],
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
      }
    }
  }
}

async function otpverify(req, res) {
  const otp = req.body.otp;
  const verification_code = req.body.verification_code;
  let otpquery = await tableNames.otp.findOne({
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
      //for new user loine start
      console.log(otpquery["brand_id"]);
      if (otpquery["brand_id"] == null) {
        const number = otpquery["number"];
        const email = otpquery["email"];

        console.log(number);
        console.log(email);
        let userinfo = {
          number: number,
          email: email,
        };
        const sqlInsert = await tableNames.brands.create(userinfo);
        if (!sqlInsert) {
          res.status(404).send({
            status: 404,
            message: "brand info not inserted",
          });
        } else {
          var data = sqlInsert.toJSON();

          const brand_id = data["brands_id"];
          const brand_number = data["number"];
          const email = data["email"];

          console.log(brand_id);
          console.log(brand_number);

          const privatekey = process.env.privateKey;
          let params = {
            brands_id: brand_id,
            number: brand_number,
            email: email,
            brandlog: true,
          };
          const token = await jwt.sign(params, privatekey, {
            expiresIn: "10d",
          });
          let tokeninfo = {
            brand_id: brand_id,
            access_tokens: token,
          };
          const sqlquery = await tableNames.access_tokens.create(tokeninfo);
          if (!sqlquery) {
            res.status(400).send({
              status: 400,
              message: "token not generated",
            });
          } else {
            console.log(otpquery["otp_id"]);
            const updateQuery = await tableNames.otp.update(
              { otp_flag: 1 },
              { where: { otp_id: otpquery["otp_id"] } }
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
                token: sqlquery["access_tokens"],
              });
            }
          }
        }
      } else {
        //for old user line start

        // res.status(200).send({
        //   status: 200,
        //   message: "old user",
        // });

        let findQuery = await tableNames.brands.findOne({
          where: {
            brands_id: otpquery["brand_id"],
          },
        });
        if (!findQuery) {
          res.status(404).send({
            status: 404,
            message: "Brand not found",
          });
        } else {
          const brands_id = findQuery["brands_id"];
          const number = findQuery["number"];
          const email = findQuery["email"];
          const privatekey = process.env.privateKey;
          let params = {
            brands_id: brands_id,
            number: number,
            email: email,
            brandlog: true,
          };
          const token = await jwt.sign(params, privatekey, {
            expiresIn: "10d",
          });
          let tokeninfo = {
            brand_id: brands_id,
            access_tokens: token,
          };
          const sqlquery = await tableNames.access_tokens.create(tokeninfo);
          if (!sqlquery) {
            res.status(400).send({
              status: 400,
              message: "token not generated",
            });
          } else {
            // console.log(otpquery["otp_id"]);
            const updateQuery = await tableNames.otp.update(
              { otp_flag: 1 },
              { where: { otp_id: otpquery["otp_id"] } }
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
                token: sqlquery["access_tokens"],
              });
            }
          }
        }
      }
    }
  }

}

module.exports = {
  brandLogin,
  otpverify,
};
