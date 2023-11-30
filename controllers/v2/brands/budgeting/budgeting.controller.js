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


      let budgetCalculatedData = [];
      for (var i = 0; i < campaignApplicationFindquery.length; i++) {
        //  console.log(campaignApplicationFindquery.length);
        cost = cost++;
        // console.log(cost);

        var itemDetails = campaignApplicationFindquery[i];
        //console.log(itemDetails); // Log the entire object
        //console.log(itemDetails["influencer"]["influencer_type_id"]);

        var infPostPrice      =  itemDetails["influencer"]["influencer_price"]["post_cost"];

        var infPostStoryCost  =  itemDetails["influencer"]["influencer_price"]["story_cost"];

        var infPostReelsCost  =  itemDetails["influencer"]["influencer_price"]["reels_cost"];
        
        var infPostVideoCost  =  itemDetails["influencer"]["influencer_price"]["video_cost"];

       
       /// Campaign Deliverables Calculation
        var campaignDeliverablesPost = campaignDeliverablesLists[cost][
            itemDetails["influencer"]["influencer_type_id"] - 1
          ]?.["post"];
   
        var campaignDeliverablesStory = campaignDeliverablesLists[cost][
            itemDetails["influencer"]["influencer_type_id"] - 1
          ]?.["story"];

        
        var campaignDeliverablesReel = campaignDeliverablesLists[cost][
            itemDetails["influencer"]["influencer_type_id"] - 1
          ]?.["reels"];

        var campaignDeliverablesVideo = campaignDeliverablesLists[cost][
            itemDetails["influencer"]["influencer_type_id"] - 1
          ]?.["youtube"];
        
        
        //Post Cost
        var camDelPostTotal = campaignDeliverablesPost * infPostPrice;
        // console.log("--------------------------------------------------------------");
        // console.log(`${camDelPostTotal} -- infPostPriceCost`);

        //Story Cost
        var camDelStoryTotal = campaignDeliverablesStory * infPostStoryCost;
        //console.log("---------------------------------------------------------------");
        // console.log(`${camDelStoryTotal} -- infPostStoryCost`);

        //Reel Cost
        var camDelReelsTotal = campaignDeliverablesReel * infPostReelsCost;
        //console.log("---------------------------------------------------------------");
        //console.log(`${camDelReelsTotal} -- infPostReelsCost`);
      
        //Video Cost
        var camDelVideoTotal = campaignDeliverablesVideo * infPostVideoCost;
        // console.log("---------------------------------------------------------------");
        // console.log(`${camDelVideoTotal} -- infPostVideoCost`);

        
        var budgetData = camDelPostTotal + camDelStoryTotal + camDelReelsTotal+ camDelVideoTotal;
       
        budgetCalculatedData.push(budgetData);
      }

      var totalBudget = budgetCalculatedData.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      var camDelPostTotalWith15Percent = totalBudget * 1.15;
      //console.log("Total Budget:", totalBudget);

      

      res.status(200).send({
        status: 200,
        total_budget_calculated:totalBudget,
        budget_calculated_with_percent:camDelPostTotalWith15Percent
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
