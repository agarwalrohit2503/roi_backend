
const tableNames = require("../../../utils/table_name");
const {db,sequelize} = require('../../../utils/conn');
var jwt = require('jsonwebtoken');



// async function updatedInfluencerPrice(req, res){
//   influencer_id = req.body.influencer_id;
//   post_cost  = req.body.post_cost;
//   reels_cost  = req.body.reels_cost;
//   video_cost = req.body.video_cost;
//   story_cost = req.body.story_cost;
//   const sqlQuery = `
//   UPDATE ${tableNames.influencer_price} SET 
//   post_cost= '${post_cost}', 
//   reels_cost= '${reels_cost}', 
//   video_cost= '${video_cost}', 
//   story_cost= '${story_cost}' WHERE influencer_id =${influencer_id}`;
//   var result = await sequelize.query(sqlQuery, { type: sequelize.QueryTypes.UPDATE},)
// if (result.length != 0) {
//   res.status(200).send(
//     { 
//       "status":200, 
//       "message":"profile updated", 
//     }
//     );
// }else{
//     res.status(404).send(
//       { 
//         "status":404, 
//         "message":"profile not updated", 
//       }
//       );
// }
// }
// async function wishlist(req, res){
//   influencer_id = req.body.influencer_id;
//   post_cost  = req.body.post_cost;
//   reels_cost  = req.body.reels_cost;
//   video_cost = req.body.video_cost;
//   story_cost = req.body.story_cost;

//   const sqlQuery = `
//   INSERT INTO ${tableNames.influencer_price} 
//   ( influencer_id, post_cost, reels_cost,video_cost, story_cost )
//    VALUES 
//    ('${influencer_id}','${post_cost}','${reels_cost}','${video_cost}','${story_cost}')
//   `;

//   var result = await sequelize.query(sqlQuery, { type: sequelize.QueryTypes.INSERT},)
// if (result.length != 0) {
 
//   res.status(200).send(
//     { 
//       "status":200, 
//       "message":"profile updated", 
//     }
//     );
// }else{
 
//     res.status(404).send(
//       { 
//         "status":404, 
//         "message":"profile not updated", 
//       }
//       );
// }
// }

async function wishlist(req, res){

    const influencer_id = req.body.influencer_id;
    const brand_id = req.body.brand_id;

    
    const wishlishquery = await tableNames.favourite_influencer.findOne({ where: { influencer_id: influencer_id , 	brand_id:brand_id}})

        if(!wishlishquery){

       let cartInfo = {
            brand_id:brand_id,
            influencer_id:influencer_id  
        }
        const cartData = await tableNames.favourite_influencer.create(cartInfo)

        if(!cartData){
          res.status(404).send({ 
            "status":404, 
            "message":"error",
          });
        }else{

              const cartUpdata = await tableNames.favourite_influencer.update({
                favourite_influencer_flag	:1,
    }, { where: { influencer_id: influencer_id , brand_id:brand_id}})
          res.status(200).send({ 
                      "status":200, 
                      "message":"cart added",
                    })
        }
     
  }else{
      //console.log(data);    

      if(wishlishquery['favourite_influencer_flag'] == 1){
            const cartUpdata = await tableNames.favourite_influencer.update({
              favourite_influencer_flag	:0,
            },  { where: { influencer_id: influencer_id , brand_id:brand_id}})
            res.status(200).send({ 
              "status":200, 
              "cartstatus": 0,
              "message":cartUpdata,
            });
      }else{
        const cartUpdata = await tableNames.favourite_influencer.update({
          favourite_influencer_flag	:1,
        },  { where: { influencer_id: influencer_id , brand_id:brand_id}})

        res.status(200).send({ 
          "status":200, 
          "cartstatus": 1,
          "message":cartUpdata,
        });
      }     
  }
}

module.exports = {
  //  updatedInfluencerPrice,
    wishlist
}