const tableNames = require("../../../../utils/table_name");
const operatorsAliases = require("../../../../utils/operator_aliases");
const editParameterQuery = require("../../../../utils/edit_query");
const { success, error } = require("../../../../utils/responseApi");
const { literal, Model } = require("sequelize");

const { db, sequelize } = require("../../../../utils/conn");
const {
  imageUpload,
  imageWithPdfUpload,
} = require("../../../../utils/image_upload");

async function campaignBudgeting(req, res) {
  const campaign_id = req.params.campaign_id;

  try {
    const campaignApplicationFindquery =
      await tableNames.campaignApplication.findAll({
        include: [
          {
            attributes: ["influencer_id", "influencer_type_id"],
            model: tableNames.influencer,
            required: false,
            include: [
              {
                model: tableNames.influencerPrice,
                required: false,
              },
            ],
          },
        ],
        where: {
          delete_flag: 0,
          campaign_id: campaign_id,
          application_status_id: 2,
        },
      });

    let campaignDeliverablesLists = [];

    if (campaignApplicationFindquery.length !== 0) {
      var returnrespData = await tableNames.campaignDeliverables.findAll({
        where: {
          campaign_id: campaign_id,
        },
      });

      campaignDeliverablesLists.push(returnrespData);
      var cost = 0;
      for (var i = 0; i < campaignApplicationFindquery.length; i++) {
        //  console.log(campaignApplicationFindquery.length);
        cost = cost++;
        // console.log(cost);

        var itemDetails = campaignApplicationFindquery[i];
        //  console.log(itemDetails); // Log the entire object
        //console.log(itemDetails["influencer"]["influencer_type_id"]);
        var infPostPrice =
          itemDetails["influencer"]["influencer_price"]["post_cost"];
        var infPostReelsCost =
          itemDetails["influencer"]["influencer_price"]["reels_cost"];
        var infPostVideoCost =
          itemDetails["influencer"]["influencer_price"]["video_cost"];
        var infPostStoryCost =
          itemDetails["influencer"]["influencer_price"]["story_cost"];

        var campaignDeliverablesPost = campaignDeliverablesLists[cost][
            itemDetails["influencer"]["influencer_type_id"] - 1
          ]?.["post"];

        

        // console.log("---------------------------------------------------------------");
        // console.log(campaignDeliverablesPost);

        // console.log(campaignDeliverablesLists[0][cost]["post"]);
        // console.log(`${campaignDeliverablesPost} ---------------harsh`);
        // var campaignDeliverablesPost = campaignDeliverablesLists[cost][itemDetails["influencer"]["influencer_type_id"]] ["post"];
        // var campaignDeliverablesStory = campaignDeliverablesLists[cost][itemDetails["influencer"]["influencer_type_id"]]["story"];
        // var campaignDeliverablesReel =
        //   campaignDeliverablesLists[cost][
        //     itemDetails["influencer"]["influencer_type_id"]
        //   ]["reels"];
        // var campaignDeliverablesVideo =
        //   campaignDeliverablesLists[cost][
        //     itemDetails["influencer"]["influencer_type_id"]
        //   ]["youtube"];
        // console.log("influencer_type_id type 1");
        // console.log(itemDetails["influencer"]["influencer_type_id"]);

        //Post Cost
        var camDelPostTotal = campaignDeliverablesPost * infPostPrice;

        console.log("---------------------------------------------------------------");

        console.log(camDelPostTotal);

        // //Story Cost
        // var camDelStoryTotal = campaignDeliverablesStory * infPostStoryCost;
        // //Reel Cost
        // var camDelReelsTotal = campaignDeliverablesReel * infPostReelsCost;
        // //Video Cost
        // var camDelVideoTotal = campaignDeliverablesVideo * infPostVideoCost;
      }

      //  console.log(campaignDeliverablesLists[0][0]["influencer_type_id"]);
      // var influencerDeatils = await Promise.all(
      //   returnrespData.map(async (item) => {
      //     console.log(item["influencer_type_id"]);
      //     const result1 = await tableNames.influencer.findAll({
      //       include: [
      //         {
      //           model: tableNames.influencerPrice,
      //           required: false,
      //         },
      //       ],
      //       where: {
      //         influencer_type_id: item["influencer_type_id"],
      //         account_delete: 0,
      //       },
      //     });
      //     return result1[0];
      //   })
      // );

      res.status(200).send({
        status: 200,
        // post: campaignDeliverablesLists[0][0]["post"],
        // story: campaignDeliverablesLists[0][0]["story"],
        // campaignDeliverablesLists: campaignDeliverablesLists[0][1]["influencer_type_id"],
        // influencer_type_id: influencerDeatils,
        influencerDeatils: campaignApplicationFindquery,
        campaignDeliverablesLists: campaignDeliverablesLists[0],
      });
    } else {
      console.log("No results found.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

module.exports = {
  campaignBudgeting,
};
