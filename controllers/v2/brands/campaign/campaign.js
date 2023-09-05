const tableNames = require("../../../../utils/table_name");
const operatorsAliases = require("../../../../utils/operator_aliases");
const editParameterQuery = require("../../../../utils/edit_query");
const imageUpload = require("../../../../utils/image_upload");
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
      {
        attributes: [
          "campaign_deliverables_id",
          "campaign_id",
          "post",
          "story",
          "real",
          "youtube",
        ],
        model: tableNames.campaignDeliverables,
      },
      {
        attributes: ["campaign_platform_id"],
        model: tableNames.campaignPlatform,
        include: [
          {
            attributes: ["platform_id", "platform_name", "platform_img"],
            model: tableNames.Platform,
          },
        ],
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

async function editCampaign(req, res) {
  
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

  try {
    const updateQuery = await tableNames.Campaign.update(
      {
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
      },
      {
        where: {
          campaign_id: campaign_id,
          brand_id: brand_id,
          campaign_delete: 0,
        },
      }
    );
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

async function addCampaign(req, res) {
  var brand_id = req.params.brand_id;
  var campaign_goal_id = req.body.campaign_goal_id;
  var content_niche_id = req.body.content_niche_id;
  var platform_id = req.body.platform_id;
  var campaign_status_id = req.body.campaign_status_id;
  var payment_status_id = req.body.payment_status_id;

  var campaign_name = req.body.campaign_name;
  var location = req.body.location;
  var campaign_about = req.body.campaign_about;
  var language = req.body.language;
  var campaign_start_dt = req.body.campaign_start_dt;
  var campaign_end_dt = req.body.campaign_end_dt;
  var campaign_budget = req.body.campaign_budget;
  var image_link = req.body.image_link;
  var about_product = req.body.about_product;

  var eligibility = req.body.eligibility;

  var post = req.body.post;
  var story = req.body.story;
  var real = req.body.real;
  var youtube = req.body.youtube;
  var finalImgeUrl = await imageUpload(image_link);

  //console.log(finalImgeUrl);
  try {
    const createQuery = await tableNames.Campaign.create({
      campaign_goal_id: campaign_goal_id,
      brand_id: brand_id,
      campaign_status_id: campaign_status_id,
      payment_status_id: payment_status_id,
      campaign_name: campaign_name,
      location: location,
      campaign_about: campaign_about,
      about_product: about_product,
      language: language,
      campaign_start_dt: campaign_start_dt,
      campaign_end_dt: campaign_end_dt,
      campaign_budget: campaign_budget,
      image_link: finalImgeUrl,

      // platform: platform,
      eligibility: eligibility,
    });
    //  console.log(createQuery);
    console.log(createQuery.campaign_id);
    if (createQuery != "") {
      let campaignContentNicheRespData = await Promise.all(
        content_niche_id.map(async (item) => {
          try {
            let content_niche_info = {
              campaign_id: createQuery.campaign_id,
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
      if (campaignContentNicheRespData == "") {
        res.status(209).send({
          status: 209,
          message: "Campaing Content Niche not inserted",
        });
      }
      let campaignPlatformRespData = await Promise.all(
        platform_id.map(async (item) => {
          try {
            let campaign_campaignPlatform_info = {
              campaign_id: createQuery.campaign_id,
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
      if (campaignPlatformRespData == "") {
        res.status(209).send({
          status: 209,
          message: "Platform Not Inserted",
        });
      }

      let campaign_deliverables_info = {
        campaign_id: createQuery.campaign_id,
        post: post,
        story: story,
        real: real,
        youtube: youtube,
      };
      insertcampaignDeliverablesQuery =
        await tableNames.campaignDeliverables.create(
          campaign_deliverables_info
        );
      if (insertcampaignDeliverablesQuery == "") {
        res.status(209).send({
          status: 209,
          message: "Campaign  Deliverables Not Inserted",
        });
      }

      res.status(200).send({
        status: 200,
        message: "Campaign Created",
      });

      console.log(data);
    } else {
      res.status(409).send({
        status: 409,
        message: "Campaign Not Created ",
      });
    }
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: "INERNAL SERVER ERROR",
      data: err,
    });
  }
}

async function getCampaignDetails(req, res) {
  const campaign_id = req.params.campaign_id;

  try {
    const findQuery = await tableNames.Campaign.findOne({
      include: [
        {
          attributes: [
            "brands_id",
            "brand_logo",
            "name",
            "overview",
            "facebook_url",
            "instagram_url",
            "youtube_url",
          ],
          model: tableNames.brands,
          as: "brand",
        },
        {
          attributes: ["campaign_payment_type_id", "name"],
          model: tableNames.campaignPaymentType,
        },
        {
          attributes: [
            "campaign_deliverables_id",
            "campaign_id",
            "post",
            "story",
            "real",
            "youtube",
            "video",
          ],
          model: tableNames.campaignDeliverables,
        },
        {
          attributes: ["campaign_platform_id"],
          model: tableNames.campaignPlatform,
          include: [
            {
              attributes: ["platform_id", "platform_name", "platform_img"],
              model: tableNames.Platform,
            },
          ],
        },

        {
          model: tableNames.campaignContentNiche,

          include: [
            {
              attributes: ["content_niche_id", "content_niche_name"],
              model: tableNames.contentNiche,
              // as: "cc",
            },
          ],
        },
      ],

      where: {
        campaign_id: campaign_id,
      },
    });

    res.status(200).send({
      status: 200,
      message:
        findQuery != null ? "Campaign Data found" : "Campaign Data Not Found",
      data: findQuery,
    });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: "INERNAL SERVER ERROR",
      data: err,
    });
  }
}

async function contentNicheDelete(req, res) {
  var campaign_id = req.params.campaign_id;
  var content_niche_id = req.body.content_niche_id;

  const content_niche_delete = content_niche_id.map(async (item) => {
    return (deleteQuery = await tableNames.campaignContentNiche.destroy({
      where: {
        campaign_id: campaign_id,
        content_niche_id: item,
      },
    }));
  });

  const respData = await Promise.all(content_niche_delete);
  if (respData != 0) {
    res.status(200).send({
      status: 200,
      message: "Deleted successfully",
    });
  } else {
    res.status(209).send({
      status: 209,
      message: "Not removed",
    });
  }
}

async function platformDelete(req, res) {
  var campaign_id = req.params.campaign_id;
  var platform_id = req.body.platform_id;

  const platfrom_delete = platform_id.map(async (item) => {
    return (deleteQuery = await tableNames.campaignPlatform.destroy({
      where: {
        campaign_id: campaign_id,
        platform_id: item,
      },
    }));
  });

  const respData = await Promise.all(platfrom_delete);
  if (respData != 0) {
    res.status(200).send({
      status: 200,
      message: "Deleted successfully",
    });
  } else {
    res.status(209).send({
      status: 209,
      message: "Not removed",
    });
  }
}
module.exports = {
  getAllCampaign,
  deleteCampaign,
  editCampaign,
  addCampaign,
  getCampaignDetails,
  contentNicheDelete,
  platformDelete,
};
