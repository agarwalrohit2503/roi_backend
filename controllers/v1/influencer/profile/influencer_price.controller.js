
const tableNames = require("../../../../utils/table_name");
const {db,sequelize} = require('../../../../utils/conn');
var jwt = require('jsonwebtoken');



async function updatedInfluencerPrice(req, res){

  influencer_id = req.params.influencer_id;
  post_cost  = req.body.post_cost;
  reels_cost  = req.body.reels_cost;
  video_cost = req.body.video_cost;
  story_cost = req.body.story_cost;

  const sqlQuery = `
  UPDATE ${tableNames.influencer_price} SET 
  post_cost= '${post_cost}', 
  reels_cost= '${reels_cost}', 
  video_cost= '${video_cost}', 
  story_cost= '${story_cost}' WHERE influencer_id =${influencer_id}`;

  var result = await sequelize.query(sqlQuery, { type: sequelize.QueryTypes.UPDATE},)
if (result.length != 0) {
 
  res.status(200).send(
    { 
      "status":200, 
      "message":"price updated", 
    }
    );
}else{
 
    res.status(404).send(
      { 
        "status":404, 
        "message":"price not updated", 
      }
      );
}
}

async function add_influencer_price(req, res){
  influencer_id = req.body.influencer_id;
  post_cost  = req.body.post_cost;
  reels_cost  = req.body.reels_cost;
  video_cost = req.body.video_cost;
  story_cost = req.body.story_cost;

  const sqlQuery = `
  INSERT INTO ${tableNames.influencer_price} 
  ( influencer_id, post_cost, reels_cost,video_cost, story_cost )
   VALUES 
   ('${influencer_id}','${post_cost}','${reels_cost}','${video_cost}','${story_cost}')
  `;

  var result = await sequelize.query(sqlQuery, { type: sequelize.QueryTypes.INSERT},)
if (result.length != 0) {
 
  res.status(200).send(
    { 
      "status":200, 
      "message":"your price added", 
    }
    );
}else{
 
    res.status(404).send(
      { 
        "status":404, 
        "message":"pls try again price not added", 
      }
      );
}
}

module.exports = {
    updatedInfluencerPrice,
  add_influencer_price
}