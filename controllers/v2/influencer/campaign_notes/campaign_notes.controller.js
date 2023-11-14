const tableNames = require("../../../../utils/table_name");

const { success, error } = require("../../../../utils/responseApi");
async function getCampaignNotes(req, res) {
  const influencer_id = req.params.influencer_id;

  const getCampaingNotes = await tableNames.Comments.findAll({
    include: [
      {
        //test
        attributes: ["campaign_applied_id"],
        model: tableNames.campaignApplication,
        include: [
          {
            model: tableNames.applicationStatus,
            required: false,
          },
          {
            attributes: [
              "campaign_name",
              "campaign_id",
              "campaign_start_dt",
              "campaign_end_dt",
            ],
            model: tableNames.Campaign,
            required: false,
            include: [
              {
                model: tableNames.campaignImages,
                limit: 1,
              },
            ],
          },
        ],
      },

      {
        attributes: ["name"],
        model: tableNames.brands,
        required: false,
      },
    ],

    order: [["comment_id", "DESC"]],
    where: { influencer_id: influencer_id, note_type: 1 },
  });

  success(
    res,
    "Campaign notes found",
    "Campaign notes Not found",
    getCampaingNotes
  );
}

module.exports = {
  getCampaignNotes,
};
