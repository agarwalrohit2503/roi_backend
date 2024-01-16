var jwt = require("jsonwebtoken");
async function jwtTokenGenerationMethod(inf_id) {
  try {
    const privatekey = process.env.privateKey;

    let params = {
      influencer_id: inf_id,
      number: "",
      brandlog: false,
    };
    const token = await jwt.sign(params, privatekey, {
      expiresIn: "10d",
    });
    let tokeninfo = {
      influencer_id: inf_id,
      number: "",
      access_tokens: token,
    };
    const accessTokensInsertQuery = await tableNames.access_tokens.create(
      tokeninfo
    );
    // console.log(sqlquery.access_tokens);

    return accessTokensInsertQuery.access_tokens;
  } catch (err) {
    return "SERVER INTERNAL ERROR";
  }
}

module.exports = jwtTokenGenerationMethod;
