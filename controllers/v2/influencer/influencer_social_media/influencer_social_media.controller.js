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

  var facebookUserDetails = await facebook.get(
    // "/me?fields=id,name,birthday,age_range,posts{full_picture,permalink_url}"
    "/me?fields=id,name,birthday,age_range,link,about,gender,location,posts.limit(5){link,created_time},photos{link,images,created_time}"
  );

  if (facebookUserDetails.data != null || facebookUserDetails.data != "") {
    try {
      // var name = response.data.name;
      // res.send(name);

      console.log(facebookUserDetails.data.id);
      console.log(facebookUserDetails.data.name);
      console.log(facebookUserDetails.data.birthday);
      console.log(facebookUserDetails.data.age_range.min);
      console.log(facebookUserDetails.data.link);
      console.log(facebookUserDetails.data.gender);
      console.log(facebookUserDetails.data.location.name);

      //JSON RESP BODY

      fbInfluencerDetails = {
        influencer_id: influencer_id,
        fb_user_id: facebookUserDetails.data.id,
        name: facebookUserDetails.data.name,
        birthday: facebookUserDetails.data.birthday,
        age_range: facebookUserDetails.data.age_range.min,
        profile_link: facebookUserDetails.data.link,
        gender: facebookUserDetails.data.gender,
        location: facebookUserDetails.data.location.name,
      };

      const fbinfluencerinsertQuery =
        await tableNames.influencerFacebook.create(fbInfluencerDetails);

      success(
        res,
        "Influencer facebook details inserted",
        "Influencer facebook details not inserted, please try again",
        fbinfluencerinsertQuery
      );
    } catch (err) {
      error(res, "INERNAL SERVER ERROR", 404);
    }
  } else {
    error(res, "Facebook Details Not Found", 404);
  }
}


module.exports = {
  addInfluencerSocialMediaDetails,
};
