const tableNames = require("../../../../utils/table_name");
const operatorsAliases = require("../../../../utils/operator_aliases");
const editParameterQuery = require("../../../../utils/edit_query");
const {
  imageUpload,
  imageWithPdfUpload,
} = require("../../../../utils/image_upload");

const { success, error } = require("../../../../utils/responseApi");
async function get(req, res) {
  var campaign_id = req.params.campaign_id;
  var limit = req.query.limit;
  var offset = req.query.offset;
  var application_status = req.query.application_status;
  var search_term = req.query.search_term;

  if (campaign_id == "" || campaign_id == null || campaign_id == 0) {
    return res
      .status(409)
      .send({ status: 409, message: "campaign id is empty" });
  }
  try {
    const findQuery = await tableNames.campaignApplication.findAll({
      attributes: [
        "campaign_applied_id",
        "campaign_id",
        "campaign_application_content_status",
      ],
      include: [
        {
          model: tableNames.influencer,
          required: true,
          where: {
            ...(search_term
              ? { name: { [operatorsAliases.$like]: `%${search_term}%` } }
              : {}),
          },
        },
        {
          attributes: ["application_status_id", "application_status_name"],
          model: tableNames.applicationStatus,
          required: false,
        },
        {
          attributes: ["campaign_status_id", "campaign_status_name"],
          model: tableNames.campaignStatus,
          required: false,
        },
      ],
      where: {
        campaign_id: campaign_id,
        ...(application_status
          ? {
              application_status_id: application_status,
            }
          : {}),
      },
      subQuery: true,
      order: [["campaign_applied_id", "DESC"]],
      offset: Number.parseInt(offset ? offset : 0),
      limit: Number.parseInt(limit ? limit : 20),
    });
    res.status(200).send({
      status: 200,
      message: findQuery != "" ? "Data found" : "Data not found",
      data: findQuery,
    });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err,
    });
  }
}

async function update(req, res) {
  var campaign_id = req.params.campaign_id;

  var campaign_applied_id = req.query.campaign_applied_id;
  var application_status = req.body.application_status;

  if (campaign_id == "" || campaign_id == null || campaign_id == 0) {
    return res
      .status(409)
      .send({ status: 409, message: "campaign id is empty" });
  }
  try {
    if (
      application_status == 1 ||
      application_status == 2 ||
      application_status == 3
    ) {
      let campaignApplicationParameters = {
        application_status_id: application_status,
      };
      const campaignApplicationUpdateQuery =
        await tableNames.campaignApplication.update(
          campaignApplicationParameters,
          {
            where: {
              campaign_id: campaign_id,
              campaign_applied_id: campaign_applied_id,
            },
          }
        );

      if (campaignApplicationUpdateQuery[0] != "") {
        res.status(200).send({
          status: 200,
          message: "Application status is updated",
        });
      } else {
        res.status(409).send({
          status: 409,
          message: "Application status is not updated",
        });
      }
    } else {
      res.status(409).send({
        status: 409,
        message: "Application status id invalid",
      });
    }
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err,
    });
  }
}

async function campaignApplicationContentApproval(req, res) {
  var campaign_applied_id = req.params.campaign_applied_id;

  var offset = req.query.offset;
  var limit = req.query.limit;

  var campaign_application_content_status =
    req.body.campaign_application_content_status;

  if (
    campaign_application_content_status == "" ||
    campaign_application_content_status == null
  ) {
    error(res, "campaign application content status id not found");
  }

  const campaignApplicationInfluencerFetchQuery =
    await tableNames.campaignApplication.findOne({
      where: {
        campaign_applied_id: campaign_applied_id,
        application_status_id: 2,
      },

      offset: Number.parseInt(offset ? offset : 0),
      limit: Number.parseInt(limit ? limit : 20),
    });

  if (
    campaignApplicationInfluencerFetchQuery == null ||
    campaignApplicationInfluencerFetchQuery == ""
  ) {
    error(res, "campaign application id not found");
  } else {
    var jsonResp = campaignApplicationInfluencerFetchQuery.toJSON();

    if (jsonResp["campaign_application_content_status"] == null) {
      error(res, "influencer did not upload their information");
    }

    const campaignApplicationContentStatusUpdateQuery =
      await tableNames.campaignApplication.update(
        {
          campaign_application_content_status:
            jsonResp["campaign_application_content_status"] == 1
              ? campaign_application_content_status
              : campaign_application_content_status,
        },
        { where: { campaign_applied_id: campaign_applied_id } }
      );

    success(
      res,
      "Influencer campaign content approved",
      "Influencer campaign content Not approval",
      campaignApplicationContentStatusUpdateQuery,
      0
    );
  }
}

module.exports = {
  get,
  update,
  campaignApplicationContentApproval,
};
