const tableNames = require("../../../../utils/table_name");
const operatorsAliases = require("../../../../utils/operator_aliases");

async function getAllCampaign(req, res) {
  var limit = req.query.limit;
  var offset = req.query.offset;
  var search_term = req.query.search_term;
  var brand_id = req.params.brand_id;

  const findQuery = await tableNames.Campaign.findAll({
    where: {
      brand_id: brand_id,
      campaign_delete: 0,
      ...(search_term
        ? { campaign_name: { [operatorsAliases.$like]: `%${search_term}%` } }
        : {}),
    },
    include: [
      {
        //attributes: ["content_niche_id", "content_niche_name"],
        model: tableNames.campaignPaymentType,
      },
      {
        model: tableNames.campaignStatus,
      },
    ],
    offset: Number.parseInt(offset ? offset : 0),
    limit: Number.parseInt(limit ? limit : 20),
  });

  res.status(200).send({
    status: 200,
    message: "Brand",
    data: findQuery,
  });
}

async function deleteCampaign(req, res) {
  const brand_id = req.params.brand_id;
  const campaign_id = req.body.campaign_id;

  console.log(brand_id);
  console.log(campaign_id);
  try {
    const updateQuery = await tableNames.Campaign.update(
      { campaign_delete: 1 },
      { where: { brand_id: brand_id, campaign_id: campaign_id } }
    );
    if (updateQuery[0] != "") {
      res.status(200).send({
        status: 200,
        message: "deleted",
      });
    } else {
      res.status(409).send({
        status: 409,
        message: "not deleted",
      });
    }
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err,
    });
  }
}

module.exports = {
  getAllCampaign,
  deleteCampaign,
};
