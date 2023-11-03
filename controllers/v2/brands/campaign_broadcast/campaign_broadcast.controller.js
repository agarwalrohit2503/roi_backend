const tableNames = require("../../../../utils/table_name");
const editParameterQuery = require("../../../../utils/edit_query");
const { success, error } = require("../../../../utils/responseApi");
const {
  imageUpload,
  imageWithPdfUpload,
} = require("../../../../utils/image_upload");
async function addCampaignBroadcast(req, res) {
  var campaign_broadcast = req.body.campaign_broadcast;

  console.log(campaign_broadcast);
  // var data = [
  //   {
  //     campaign_applied_id: 60,
  //     influencer_id: 2,
  //     brand_id: 1,
  //     sender_type: "BRANDS", // Brands side send BRANDS....
  //     comment_text: "xcxc",
  //     comment_file: [
  //       "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",
  //       "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",
  //     ],
  //     file_type: "image",
  //   },

  //   {
  //     campaign_applied_id: 60,
  //     influencer_id: 2,
  //     brand_id: 1,
  //     sender_type: "BRANDS", // Brands side send BRANDS....
  //     comment_text: "xcxc",
  //     comment_file: [
  //       "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",
  //       "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",
  //     ],
  //     file_type: "image",
  //   },

  //   {
  //     campaign_applied_id: 60,
  //     influencer_id: 2,
  //     brand_id: 1,
  //     sender_type: "BRANDS", // Brands side send BRANDS....
  //     comment_text: "xcxc",
  //     comment_file: [
  //       "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",
  //       "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",
  //     ],
  //     file_type: "image",
  //   },
  // ];

  const campaignBroadcastData = await campaign_broadcast.map(async (item) => {
    const campaignApplicationFindQuery =
      await tableNames.campaignApplication.findOne({
        where: {
          campaign_applied_id: item.campaign_applied_id,
          delete_flag: 0,
        },
      });
    if (
      campaignApplicationFindQuery == null ||
      campaignApplicationFindQuery == ""
    ) {
      error(res, "Campaign Application not found");
    } else {
      const campaignFindQuery = await tableNames.Campaign.findOne({
        where: {
          campaign_id: campaignApplicationFindQuery.campaign_id,
          campaign_delete: 0,
        },
      });
      if (campaignFindQuery == null || campaignFindQuery == "") {
        error(res, "Campaigning not found");
      } else {
        var finalImgeUrl = "";
        if (item.comment_file != "") {
          finalImgeUrl = await imageWithPdfUpload(
            item.comment_file,
            item.file_type
          );
        }

        let commentAddParameter = {
          campaign_applied_id: item.campaign_applied_id,
          influencer_id: item.influencer_id,
          brand_id: item.brand_id,
          sender_type: item.sender_type,
          comment_text: item.comment_text,
          comment_file: finalImgeUrl ?? "",
          file_type: item.file_type != "" ? item.file_type : "image",
        };

        var commentAddQuery = await tableNames.Comments.create(
          commentAddParameter
        );

        return commentAddQuery;
      }
    }
  });
  const respData = await Promise.all(campaignBroadcastData);
  success(
    res,
    "Campaign broadcast Created",
    "Campaign broadcast Not Added",
    respData,
    1
  );
}

module.exports = {
  addCampaignBroadcast,
};
