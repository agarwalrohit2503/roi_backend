const tableNames = require("../../../../utils/table_name");
const operatorsAliases = require("../../../../utils/operator_aliases");
const { success, error } = require("../../../../utils/responseApi");
const Facebook = require("facebook-js-sdk");

const facebook = new Facebook({
  appId: "635339838813094",
  appSecret: "78afb793f5c2816775bf34043309f0c8",
  redirectUrl: "http://localhost/callback",
  graphVersion: "v18.0",
});

async function addInfluencerSocialMediaDetails(req, res) {
  var influencer_id = req.params.influencer_id;
  // var fb_access_token = req.body.fb_access_token;

  facebook.setAccessToken(
    "EAAJB1pVnc6YBOZC7I9rlqclsauRoW7Qvx8BnSjgtlOknpFUjDhjdpAx6VTBPpyinFFZAlWrbdGbF4etBCXovsdBaKHVgp6y99PfNjtQxgw1ZBjbIK8cy1RkNge9MgOv1sGe3ZCfVN8k1Gp8ZBhzGgPGiYuUd4oUQFyUBFN2ZCxDzpkeXmWYc8DSWf5ZBZAZBAGy0F8nr0xU0z4dO7J57Mxiw4B2QokAYZD"
  );

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
