const tableNames = require("../../../../utils/table_name");

const { success, error } = require("../../../../utils/responseApi");

async function campaignApplicationInfluencerContent(req, res) {
  
  var influencer_id       = req.params.influencer_id;

  var campaign_applied_id = req.body.campaign_applied_id;
  var content_link        = req.body.content_link;
  var image_link          = req.body.image_link;


  let addInfluencerApplicationcontentRespData = await Promise.all(
    image_link.map(async (item) => {
      var influencerContentInfo = {
        influencer_id: influencer_id,
        campaign_applied_id: campaign_applied_id,
        image_link: item,
      };

      const influencerContentUploadCreateQuery =
        await tableNames.campaignApplicationContent.create(
          influencerContentInfo
        );

      return influencerContentUploadCreateQuery;
    })
  );

  let addInfluencerContentRespData = await Promise.all(
    content_link.map(async (item) => {
      var influencerContentInfo = {
        influencer_id: influencer_id,
        campaign_applied_id: campaign_applied_id,
        content_link: item,
      };

      const influencerContentUploadCreateQuery =
        await tableNames.campaignApplicationContent.create(
          influencerContentInfo
        );

      return influencerContentUploadCreateQuery;
    })
  );

  success(
    res,
    "Campaign Content uploaded",
    "Campaign Content Not uploaded",
    addInfluencerApplicationcontentRespData,
    1
  );
}

module.exports = {
  campaignApplicationInfluencerContent,
};