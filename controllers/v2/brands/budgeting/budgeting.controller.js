const tableNames = require("../../../../utils/table_name");
const operatorsAliases = require("../../../../utils/operator_aliases");
const editParameterQuery = require("../../../../utils/edit_query");
const { success, error } = require("../../../../utils/responseApi");
const { literal } = require("sequelize");
const {
  imageUpload,
  imageWithPdfUpload,
} = require("../../../../utils/image_upload");

async function campaignBudgeting(req, res) {
  var limit = req.query.limit;
  var offset = req.query.offset;
  var search_term = req.query.search_term;

  var totalNumberOfInfluencer = req.body.total_influencer;
  var reels_cost = req.body.reels_cost;
  var video_cost = req.body.video_cost;
  var story_cost = req.body.story_cost;
  // var post_cost_low = req.body.post_cost_low;
  // var post_cost_high = req.body.post_cost_high;

  //Post cost low & high
  var post_cost_low = 10;
  var post_cost_high = 800;

  //reels cost low & high
  var reels_cost_low = 10;
  var reels_cost_high = 50;

  //Selected Influencers
  var selectedInfluencers = [1, 2, 3];

  const findinfluencer = await tableNames.influencerPrice.findAll({
    include: [
      {
        model: tableNames.influencer,
        required: true,
        where: {
          influencer_id: selectedInfluencers,
        },
      },
    ],
    where: {
      // account_delete: 0,
      where: {
        [operatorsAliases.$and]: [
          {
            ...(post_cost_high || post_cost_low
              ? {
                  [operatorsAliases.$and]: [
                    literal(
                      `post_cost BETWEEN  ${post_cost_low} AND ${post_cost_high} `
                    ),
                  ],
                }
              : {}),
          },
          {
            ...(reels_cost_high || reels_cost_low
              ? {
                  [operatorsAliases.$and]: [
                    literal(
                      `reels_cost BETWEEN  ${reels_cost_low} AND ${reels_cost_high} `
                    ),
                  ],
                }
              : {}),
          },
        ],

        // ...(post_cost_high || post_cost_low
        //   ? {
        //       [operatorsAliases.$and]: [
        //         {
        //           post_cost: {
        //             [operatorsAliases.$between]: [
        //               post_cost_low,
        //               post_cost_high,
        //             ],
        //           },
        //         },
        //       ],
        //     }
        //   : {}),
      },
    },
  });
  // [operatorsAliases.$and]: [
  //   {
  //     ...(post_cost_high || post_cost_low
  //       ? {
  //           [operatorsAliases.$and]: [
  //             literal(`post_cost >= ${post_cost_high}`),
  //             literal(`post_cost <= ${post_cost_low}`),
  //           ],
  //         }
  //       : {}),
  //   },
  // ],
  success(
    res,
    "Influencer  successfully found",
    "Influencer Not found",
    findinfluencer,
    0
  );
}

module.exports = {
  campaignBudgeting,
};
