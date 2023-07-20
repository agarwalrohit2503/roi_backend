const tableNames = require("../../../utils/table_name");
const { db, sequelize } = require("../../../utils/conn");
var jwt = require("jsonwebtoken");

async function getProfile(req, res) {
  influencer_id = req.params.influencer_id;

  //console.log(uuid);

  const sqlQuery = `
  SELECT i.*,
inf_price.post_cost,
inf_price.reels_cost,
inf_price.video_cost,
inf_price.story_cost,
state.state_name,
city.city_name,
cont_niche.content_niche_name,
inf_fb.influencer_facebook_id,
inf_insta.influencer_instagram_id,
inf_yt.influencer_youtube_id,
inf_adds.address,
inf_file.link,
inf_file.file_name
  FROM ${tableNames.influencer_user} as i 
  LEFT JOIN ${tableNames.influencer_price} as inf_price ON i.influencer_id  = inf_price.influencer_id 
  
   LEFT JOIN ${tableNames.influencer_address} as inf_adds ON i.influencer_id  = inf_adds.influencer_id
  LEFT JOIN ${tableNames.influencer_file} as inf_file ON i.influencer_id  = inf_file.influencer_id
  
  LEFT JOIN ${tableNames.influencer_facebook} as inf_fb ON i.influencer_id  = inf_fb.influencer_id
  LEFT JOIN ${tableNames.influencer_instagram} as inf_insta ON i.influencer_id  = inf_insta.influencer_id 
  LEFT JOIN ${tableNames.influencer_youtube} as inf_yt ON i.influencer_id  = inf_yt.influencer_id 
  
  
  LEFT JOIN ${tableNames.influencer_content_niche} as influencerniche ON i.influencer_id  = influencerniche.influencer_id   
  LEFT JOIN ${tableNames.content_niche} as cont_niche ON influencerniche.content_niche_id  = cont_niche.content_niche_id
  LEFT JOIN ${tableNames.state} as state ON i.state_id  = state.state_id 
  LEFT JOIN ${tableNames.city} as city ON i.city_id  = city.city_id 
  where  i.influencer_id =  ${influencer_id}
  `;
  var result = await sequelize.query(sqlQuery, {
    type: sequelize.QueryTypes.SELECT,
  });
  if (result.length != 0) {
    res.status(200).send({
      status: 200,
      message: "Your profile",
      data: result,
    });
  } else {
    res.status(404).send({
      status: 404,
      message: "Influencer not found",
    });
  }
}

async function updateprofile(req, res) {
  influencer_id = req.params.influencer_id;

  Name = req.body.name;
  email = req.body.email;
  gender = req.body.gender;
  // number= req.body.number;
  dob = req.body.dob;
  country = req.body.country;
  pan_card = req.body.pan_card;
  gst_number = req.body.gst_number;
  bio = req.body.bio;
  city_id = req.body.city_id;
  state_id = req.body.state_id;

  profile_status = req.body.profile_status;

  const sqlQuery = `
  UPDATE ${tableNames.influencer_user} SET city_id= '${city_id}', state_id= '${state_id}', name= '${Name}', email= '${email}', gender='${gender}', dob= '${dob}', country= '${country}', pan_card='${pan_card}', gst_number= '${gst_number}', bio= '${bio}', profile_status=1 WHERE influencer_id =${influencer_id}`;

  var result = await sequelize.query(sqlQuery, {
    type: sequelize.QueryTypes.UPDATE,
  });
  if (result.length != 0) {
    res.status(200).send({
      status: 200,
      message: "profile updated",
    });
  } else {
    res.status(404).send({
      status: 404,
      message: "profile not updated",
    });
  }
}

module.exports = {
  getProfile,
  updateprofile,
};
