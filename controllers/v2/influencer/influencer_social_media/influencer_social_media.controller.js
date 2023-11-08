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
    .then(async (response) => {
      // var name = response.data.name;
      // res.send(name);

      console.log(response.data.id);
      console.log(response.data.name);
      console.log(response.data.birthday);
      console.log(response.data.age_range.min);
      console.log(response.data.link);
      console.log(response.data.gender);
      console.log(response.data.location.name);

      //JSON RESP BODY

      fbInfluencerDetails = {
        influencer_id: influencer_id,
        fb_user_id: response.data.id,
        name: response.data.name,
        birthday: response.data.birthday,
        age_range: response.data.age_range.min,
        profile_link: response.data.link,
        gender: response.data.gender,
        location: response.data.location.name,
      };

      const fbinfluencerinsertQuery =
        await tableNames.influencerFacebook.create(fbInfluencerDetails);

      success(
        res,
        "Influencer facebook details inserted",
        "Influencer facebook details not inserted, please try again",
        fbinfluencerinsertQuery
      );
    })
    .catch((error) => {
      res.send("not found");
    });
}

module.exports = {
  addInfluencerSocialMediaDetails,
};
