const tableNames = require("../../../../utils/table_name");
const operatorsAliases = require("../../../../utils/operator_aliases");
const editParameterQuery = require("../../../../utils/edit_query");
const { success, error } = require("../../../../utils/responseApi");
const { literal } = require("sequelize");

const { db, sequelize } = require("../../../../utils/conn");
const {
  imageUpload,
  imageWithPdfUpload,
} = require("../../../../utils/image_upload");

// async function campaignBudgeting(req, res) {
//   var limit = req.query.limit;
//   var offset = req.query.offset;
//   var search_term = req.query.search_term;

//   // var totalNumberOfInfluencer = req.body.total_influencer;
//   // var reels_cost = req.body.reels_cost;
//   // var video_cost = req.body.video_cost;
//   // var story_cost = req.body.story_cost;
//   // var post_cost_low = req.body.post_cost_low;
//   // var post_cost_high = req.body.post_cost_high;

//   //Post cost low & high
//   var post_cost_low = 10;
//   var post_cost_high = 2000;

//   //reels cost low & high
//   var reels_cost_low = 10;
//   var reels_cost_high = 500;

//   //Selected Influencers
//   //var selectedInfluencers = [1, 3];

//   const findinfluencer = await tableNames.influencerPrice.findAll({
//     include: [
//       {
//         // attributes: [
//         //   [
//         //     sequelize.fn("COUNT", sequelize.col("influencer.influencer_id")),
//         //     "incluencer",
//         //   ],
//         // ],
//         model: tableNames.influencer,
//         required: true,
//         where: {
//           // influencer_id: selectedInfluencers,
//           account_delete: 0,
//         },
//       },
//     ],
//     where: {
//       where: {
//         [operatorsAliases.$and]: [
//           {
//             ...(post_cost_high || post_cost_low
//               ? {
//                   [operatorsAliases.$and]: [
//                     literal(
//                       `post_cost BETWEEN  ${post_cost_low} AND ${post_cost_high} `
//                     ),
//                   ],
//                 }
//               : {}),
//           },
//           {
//             ...(reels_cost_high || reels_cost_low
//               ? {
//                   [operatorsAliases.$and]: [
//                     literal(
//                       `reels_cost BETWEEN  ${reels_cost_low} AND ${reels_cost_high} `
//                     ),
//                   ],
//                 }
//               : {}),
//           },
//         ],

//         // ...(post_cost_high || post_cost_low
//         //   ? {
//         //       [operatorsAliases.$and]: [
//         //         {
//         //           post_cost: {
//         //             [operatorsAliases.$between]: [
//         //               post_cost_low,
//         //               post_cost_high,
//         //             ],
//         //           },
//         //         },
//         //       ],
//         //     }
//         //   : {}),
//       },
//     },
//   });
//   // [operatorsAliases.$and]: [
//   //   {
//   //     ...(post_cost_high || post_cost_low
//   //       ? {
//   //           [operatorsAliases.$and]: [
//   //             literal(`post_cost >= ${post_cost_high}`),
//   //             literal(`post_cost <= ${post_cost_low}`),
//   //           ],
//   //         }
//   //       : {}),
//   //   },
//   // ],
//   success(
//     res,
//     "campaign Budgeting successfully found",
//     "campaign Budgeting Not found",
//     findinfluencer,
//     0
//   );
// }

async function campaignBudgeting(req, res) {
  var campaign_id = req.params.campaign_id;

  const campaignApplicationFindQuery =
    await tableNames.campaignApplication.findAll({
      where: {
        delete_flag: 0,
        campaign_id: campaign_id,
        application_status_id: 2,
      },
    });

  if (
    campaignApplicationFindQuery == null ||
    campaignApplicationFindQuery == ""
  ) {
    error(res, "campaign not found ");
  }

  //console.log(campaignApplicationFindQuery["influencer_id"]);

  // const content_niche_delete = content_niche_id.map(async (item) => {
  //   return (deleteQuery = await tableNames.campaignContentNiche.destroy({
  //     where: {
  //       campaign_id: campaign_id,
  //       content_niche_id: item,
  //     },
  //   }));
  // });

  // const data = campaignApplicationFindQuery.map(async (item) => {
  //   //console.log(item["influencer_id"]);
  //   // return (
  //   await tableNames.influencer.findAll({
  //     where: {
  //       influencer_id: item["influencer_id"],
  //       account_delete: 0,
  //     },
  //   });

  //  // console.log(influencerFindQuery);

  //   return influencerFindQuery;

  //   // )
  // });

  // const respData = await Promise.all(data);

  // console.log(respData);

  // const reviewPromises = campaignApplicationFindQuery.map(async (result) => {
  //   const user = await tableNames.influencer.findAll({
  //     where: {
  //       influencer_id: result["influencer_id"],
  //       account_delete: 0,
  //     },
  //   });
  //   return user;
  // });
  // const reviewData = await Promise.all(reviewPromises);

  // console.log(reviewData);

  let userData = [];

  await Promise.all(
    campaignApplicationFindQuery.map(async (item) => {
  
    try {
      var user = await tableNames.influencer.findAll({
        where: {
          influencer_id: item["influencer_id"],
          account_delete: 0,
        },
      });

      userData.push(user);
      } catch (error) {
      res.status(500).send({
        status: 500,
        message: "Internal server error1",
      });
      }
    })
  );

  console.log(userData);

  // success(
  //   res,
  //   "campaign Budgeting successfully found",
  //   "campaign Budgeting Not found",
  //   userData,
  //   0
  // );
}

module.exports = {
  campaignBudgeting,
  //cambudgetingtest,
};
