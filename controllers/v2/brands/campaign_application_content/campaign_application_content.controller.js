const tableNames = require("../../../../utils/table_name");
const {
  imageUpload,
  imageWithPdfUpload,
} = require("../../../../utils/image_upload");
const { success, error } = require("../../../../utils/responseApi");

async function getApplicationInfluencerContent(req, res) {
  var campaign_applied_id = req.params.campaign_applied_id;

  const fetchInfluencerContentData =
    await tableNames.campaignApplicationContent.findAll({
      where: {
        delete_flag: 0,
        campaign_applied_id: campaign_applied_id,
      },

      offset: Number.parseInt(offset ? offset : 0),
      limit: Number.parseInt(limit ? limit : 20),
    });

    

  success(
    res,
    "Influencer campaign content found",
    "Influencer campaign content Not found",
    fetchInfluencerContentData,
    0
  );
}

module.exports = {
  getApplicationInfluencerContent,
};
