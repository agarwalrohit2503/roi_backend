const tableNames = require("../../../../utils/table_name");
const operatorsAliases = require("../../../../utils/operator_aliases");
const path = require("path");
const dotenv = require("dotenv").config({
  path: path.resolve(process.cwd(), ".env"),
});
const { success, error } = require("../../../../utils/responseApi");
// const fbTokenAccess = require("../../../../utils/fb_secret_keys");
const Facebook = require("facebook-js-sdk");

const facebook = new Facebook({
  appId: process.env.appId,
  appSecret: process.env.appSecret,
  redirectUrl: process.env.redirectUrl,
  graphVersion: process.env.graphVersion,
});

async function addInfluencerSocialMediaDetails(req, res) {
  var influencer_id = req.params.influencer_id;
  // var fb_access_token = req.body.fb_access_token;

  facebook.setAccessToken(process.env.fbAccessToken);

  facebook
    .get(
      // "/me?fields=id,name,birthday,age_range,posts{full_picture,permalink_url}"
      "/me?fields=id,name,birthday,age_range,link,about,gender,location,posts.limit(5){link,created_time},photos{link,images,created_time}"
    )
    .then((response) => {
      // var name = response.data.name;
      // res.send(name);

      //JSON RESP BODY
      success(res, "Influencer social", "Influencer social", response.data);
    })
    .catch((error) => {
      res.send("not found");
    });
}

module.exports = {
  addInfluencerSocialMediaDetails,
};
