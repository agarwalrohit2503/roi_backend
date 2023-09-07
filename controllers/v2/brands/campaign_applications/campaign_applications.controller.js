const tableNames = require("../../../../utils/table_name");
const operatorsAliases = require("../../../../utils/operator_aliases");
const editParameterQuery = require("../../../../utils/edit_query");
const imageUpload = require("../../../../utils/image_upload");

async function get(req, res) {
  var campaign_id = req.params.campaign_id;

  var limit = req.query.limit;
  var offset = req.query.offset;
  var application_status = req.query.application_status;
  var search_term = req.query.search_term;
  
  const findQuery = await tableNames.campaignApplication.findAll({
    attributes: ["campaign_applied_id", "campaign_id"],

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
    order: [
      ["campaign_applied_id", "DESC"],
      // ['name', 'ASC'],
    ],
    offset: Number.parseInt(offset ? offset : 0),
    limit: Number.parseInt(limit ? limit : 20),
  });

  res.status(200).send({
    status: 200,

    message: findQuery != "" ? "Data found" : "Data not found",
    data: findQuery,
  });
}

async function update(req, res) {
  var brand_id = req.params.brand_id;
  var campaign_id = req.body.campaign_id;

  var content_niche_id = req.body.content_niche_id;
  var platform_id = req.body.platform_id;
  var campaign_goal_id = req.body.campaign_goal_id;
  var campaign_status_id = req.body.campaign_status_id;
  var payment_status_id = req.body.payment_status_id;
  var campaign_name = req.body.campaign_name;
  var location = req.body.location;
  var campaign_about = req.body.campaign_about;
  var about_product = req.body.about_product;
  var language = req.body.language;
  var campaign_start_dt = req.body.campaign_start_dt;
  var campaign_end_dt = req.body.campaign_end_dt;
  var campaign_budget = req.body.campaign_budget;
  var image_link = req.body.image_link;
  var platform = req.body.platform;
  var eligibility = req.body.eligibility;

  var post = req.body.post;
  var story = req.body.story;
  var real = req.body.real;
  var youtube = req.body.youtube;

  if (image_link != "") {
    image_link = await imageUpload(image_link);
  }

  try {
    let campaingEditParameters = {
      campaign_status_id: campaign_status_id,
      payment_status_id: payment_status_id,
      campaign_goal_id: campaign_goal_id,
      campaign_name: campaign_name,
      location: location,
      campaign_about: campaign_about,
      about_product: about_product,
      language: language,
      campaign_start_dt: campaign_start_dt,
      campaign_end_dt: campaign_end_dt,
      campaign_budget: campaign_budget,
      image_link: image_link,
      platform: platform,
      eligibility: eligibility,
    };
    var campaignEditedValue = await editParameterQuery(campaingEditParameters);

    const updateQuery = await tableNames.Campaign.update(campaignEditedValue, {
      where: {
        campaign_id: campaign_id,
        brand_id: brand_id,
        campaign_delete: 0,
      },
    });

    if (updateQuery[0] != "") {
      let campaignContentNicheRespData = await Promise.all(
        content_niche_id.map(async (item) => {
          try {
            let content_niche_info = {
              campaign_id: campaign_id,
              content_niche_id: item,
            };
            insertContentNicheQuery =
              await tableNames.campaignContentNiche.create(content_niche_info);

            return insertContentNicheQuery;
          } catch (error) {
            return { ...item, error };
          }
        })
      );

      console.log(campaignContentNicheRespData);
      if (
        campaignContentNicheRespData == "" ||
        campaignContentNicheRespData == null
      ) {
        res.status(209).send({
          status: 209,
          message: "Campaing Content Niche not inserted",
        });
      }

      let campaignPlatformRespData = await Promise.all(
        platform_id.map(async (item) => {
          try {
            let campaign_campaignPlatform_info = {
              campaign_id: campaign_id,
              platform_id: item,
            };
            insertcampaignPlatformQuery =
              await tableNames.campaignPlatform.create(
                campaign_campaignPlatform_info
              );

            return insertcampaignPlatformQuery;
          } catch (error) {
            return { ...item, error };
          }
        })
      );
      if (
        (campaignPlatformRespData == "") |
        (campaignPlatformRespData == null)
      ) {
        res.status(209).send({
          status: 209,
          message: "Platform Not Inserted",
        });
      }

      let DeliverablesEdit = {
        post: post,
        story: story,
        real: real,
        youtube: youtube,
      };
      var DeliverablesEditedData = await editParameterQuery(DeliverablesEdit);

      const updateQuery = await tableNames.campaignDeliverables.update(
        DeliverablesEditedData,
        {
          where: {
            campaign_id: campaign_id,
          },
        }
      );

      //console.log(updateQuery);
      res.status(200).send({
        status: 200,
        message: "Campaign edited",
      });
    } else {
      res.status(409).send({
        status: 409,
        message: "Campaign not edited",
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
  get,
  update,
};
