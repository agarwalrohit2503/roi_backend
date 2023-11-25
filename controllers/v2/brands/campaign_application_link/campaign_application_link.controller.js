const tableNames = require("../../../../utils/table_name");
const {
  imageUpload,
  imageWithPdfUpload,
} = require("../../../../utils/image_upload");
const { success, error } = require("../../../../utils/responseApi");

async function getApplicationInfluencerlinks(req, res) {
  var campaign_applied_id = req.params.campaign_applied_id;


  var offset = req.query.offset;
  var limit = req.query.limit;

  const fetchInfluencerLinksData =
    await tableNames.campaignApplicationLink.findAll({
      where: {
        delete_flag: 0,
        campaign_applied_id: campaign_applied_id,
      },

      offset: Number.parseInt(offset ? offset : 0),
      limit: Number.parseInt(limit ? limit : 20),
    });

  success(
    res,
    "Influencer campaign links found",
    "Influencer campaign links Not found",
    fetchInfluencerLinksData,
    0
  );
}

module.exports = {
  getApplicationInfluencerlinks,
};
