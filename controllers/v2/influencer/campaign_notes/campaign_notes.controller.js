const tableNames = require("../../../../utils/table_name");

const { success, error } = require("../../../../utils/responseApi");
async function getCampaignNotes(req, res) {
  const influencer_id = req.params.influencer_id;

  const getCampaingNotes = await tableNames.Comments.findAll({
    where: { influencer_id: influencer_id, note_type: 1 },
    include: [
      {
        attributes: ["campaign_applied_id"],
        model: tableNames.campaignApplication,
        include: [
          {
            model: tableNames.applicationStatus,
            required: false,
          },
        ],
      },
    ],
  });

  success(
    res,
    "Campaign notes found",
    "Campaign notes Not found",
    getCampaingNotes,
    
  );
}

module.exports = {
  getCampaignNotes,
};
