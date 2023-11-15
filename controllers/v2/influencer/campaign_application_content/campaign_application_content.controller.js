const tableNames = require("../../../../utils/table_name");

const { success, error } = require("../../../../utils/responseApi");
async function campaignApplicationInfluencerContent(req, res) {
  const influencer_id = req.params.influencer_id;

  
  success(
    res,
    "Campaign notes found",
    "Campaign notes Not found",
    getCampaingNotes
  );
}

module.exports = {
  campaignApplicationInfluencerContent,
};
