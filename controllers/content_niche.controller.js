
const tableNames = require("../utils/table_name");
const {db,sequelize} = require('../utils/conn');
var jwt = require('jsonwebtoken');


async function updateContentNiche(req, res){
  influencer_id = req.body.influencer_id;

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
      "message":"profile updated", 
    }
    );
}else{
 
    res.status(404).send(
      { 
        "status":404, 
        "message":"profile not updated", 
      }
      );
}
}
async function AddContentNiche(req, res){
    influencer_id = req.body.influencer_id;
  content_niche_id  = req.body.content_niche_id;

  sqlquery =`SELECT * FROM ${tableNames.influencer_content_niche}  WHERE influencer_id= '${influencer_id}'`;
  result=await sequelize.query(sqlquery, { type: sequelize.QueryTypes.SELECT})


  if(result.length != 0){  


    sqldelete =`DELETE FROM ${tableNames.influencer_content_niche} WHERE  influencer_id= ${influencer_id}`;
    result=await sequelize.query(sqldelete, { type: sequelize.QueryTypes.DELETE})
    if(!result){  
         content_niche_id.map(async (result) => {
      const sqlQuery = `
      INSERT INTO ${tableNames.influencer_content_niche} 
      ( influencer_id, content_niche_id )
      VALUES
      ('${influencer_id}','${result}')`;

    var result = await sequelize.query(sqlQuery, { type: sequelize.QueryTypes.INSERT},)
    if (result.length != 0) {
    res.status(200).send(
        { 
        "status":200, 
        "message":"Your Content Niche added", 
        }
        );
    }else{
        res.status(404).send(
        { 
            "status":404, 
            "message":"INTERNAL ERROR", 
        }
      );
}
  });
    }else{
      
        res.status(404).send(
            { 
                "status":404, 
                "message":"Your previews content niche not deleted", 
            }
          );
    }
  }else{
      content_niche_id.map(async (result) => {
      const sqlQuery = `
      INSERT INTO ${tableNames.influencer_content_niche} 
      ( influencer_id, content_niche_id )
      VALUES
      ('${influencer_id}','${result}')`;

    var result = await sequelize.query(sqlQuery, { type: sequelize.QueryTypes.INSERT},)
    if (result.length != 0) {
        res.status(200).send(
            { 
            "status":200, 
            "message":"Your Content Niche added", 
            }
            );
        }else{
            res.status(404).send(
            { 
                "status":404, 
                "message":"INTERNAL ERROR", 
            }
          );
}
  });
  }
}
async function GetContentNiche(req,  res){
    selectQuery = `SELECT * FROM ${tableNames.content_niche}`;
    result=await sequelize.query(selectQuery, { type: sequelize.QueryTypes.SELECT})


    if (result.length != 0) {
        res.status(200).send(
            { 
            "status":200, 
            "message":"Content Niche data", 
            "data":result
            }
            );
        }else{
            res.status(404).send(
            { 
                "status":404, 
                "message":"INTERNAL ERROR", 
            }
          );
    }
}
module.exports = {
   // updateContentNiche,
    AddContentNiche,
    GetContentNiche
}