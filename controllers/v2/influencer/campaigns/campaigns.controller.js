const tableNames = require("../../../../utils/table_name");
const operatorsAliases = require("../../../../utils/operator_aliases");

async function getCampaigns(req, res) {
  var limit = req.query.limit;
  var offset = req.query.offset;
  var search_term = req.query.search_term;

  try {
    const findQuery = await tableNames.Campaign.findAll({
      // attributes: [
      //   "campaign_id",
      //   "campaign_name",
      //   "campaign_about",
      //   "location",
      //   "platform",
      //   "language",
      //   "image_link",
      //   "campaign_budget",
      //   "campaign_start_dt",
      //   "campaign_end_dt",
      // ],
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
          attributes: ["campaign_content_niche_id", "content_niche_id"],
          model: tableNames.campaignContentNiche,
          include: [
            {
              attributes: [
                "content_niche_id",
                "content_niche_name",
                "image_link",
              ],
              model: tableNames.contentNiche,
            },
          ],
        },
      ],

      //raw: true,
      where: {
        ...(search_term
          ? { campaign_name: { [operatorsAliases.$like]: `%${search_term}%` } }
          : {}),
        campaign_delete: 0,
        // campaign_status_id: 1,
      },
      order: [
        ["campaign_id", "DESC"],
        // ['name', 'ASC'],
      ],
      offset: Number.parseInt(offset ? offset : 0),
      limit: Number.parseInt(limit ? limit : 20),
      //subQuery: true,
    });

    res.status(200).send({
      status: 200,
      message:
        findQuery != "" ? "Campaign Data found" : "Campaign Data Not Found",
      data: findQuery,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Internal server error",
      data: error,
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
          // as: "payment_status",
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
          attributes: ["campaign_content_niche_id", "content_niche_id"],
          model: tableNames.campaignContentNiche,
          include: [
            {
              attributes: [
                "content_niche_id",
                "content_niche_name",
                "image_link",
              ],
              model: tableNames.contentNiche,
            },
          ],
        },

        {
          model: tableNames.campaignContentNiche,
          include: [
            {
              attributes: ["content_niche_id", "content_niche_name"],
              model: tableNames.contentNiche,
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
        findQuery != null
          ? "Campaign Details found"
          : "Campaign Details Not Found",
      data: findQuery,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Internal server error",
      data: error,
    });
  }
}

async function getDemoCampaigns(req, res) {
  getCampaigns(req, res);
}

async function getCampaignApplications(req, res) {
  influencer_id = req.params.influencer_id;

  var limit = req.query.limit;
  var offset = req.query.offset;
  var search_term = req.query.search_term;
  var status_id = req.query.status_id;

  const findQuery = await tableNames.campaignApplication.findAll({
    attributes: ["campaign_applied_id"],
    include: [
      {
        attributes: [
          "campaign_id",

          "campaign_name",
          "location",
          "language",
          "image_link",
          "platform",
          "campaign_budget",
          "campaign_about",
          "campaign_start_dt",
          "campaign_end_dt",
        ],
        model: tableNames.Campaign,
        include: [
          {
            attributes: ["brands_id", "brand_logo", "name"],
            model: tableNames.brands,
            include: [
              {
                attributes: ["state_id", "state_name"],
                model: tableNames.State,
              },
              {
                attributes: ["city_id", "city_name"],
                model: tableNames.City,
              },
            ],
          },
        ],
        // as: "brand",
      },
      {
        model: tableNames.applicationStatus,
      },
      {
        model: tableNames.campaignStatus,
      },
    ],
    // order: [
    //   ["createdAt", "DESC"],
    //   // ['name', 'ASC'],
    // ],
    //raw: true,
    where: {
      influencer_id: influencer_id,
      application_status_id: status_id,
      ...(search_term
        ? { campaign_name: { [operatorsAliases.$like]: `%${search_term}%` } }
        : {}),
      // campaign_delete: 0,
    },
    offset: Number.parseInt(offset ? offset : 0),
    limit: Number.parseInt(limit ? limit : 20),
    //subQuery: true,
  });

  // selectQuery = `
  //     SELECT
  //     camapplied.influencer_id,
  //     camapplied.campaign_applied_id,
  //     c.campaign_name,
  //       c.campaign_id,
  //       c.campaign_about ,
  //       c.language,
  //       c.campaign_start_dt,
  //       c.campaign_end_dt,
  //       c.campaign_image,
  //       c.campaign_budget,
  //       b.brand_logo,
  //       b.name,
  //       f.campaign_status_name

  //       FROM ${tableNames.campaign_application}  as camapplied
  //       LEFT JOIN ${
  //         tableNames.campaign
  //       } as c ON camapplied.campaign_id = c.campaign_id
  //        LEFT JOIN ${
  //          tableNames.campaign_status
  //        } as f ON camapplied.campaign_status_id = f.campaign_status_id
  //        LEFT JOIN ${tableNames.brand} as b ON c.brand_id = b.brands_id
  //        WHERE
  //        camapplied.influencer_id = ${influencer_id}
  //        and
  //        c.campaign_delete = 0

  //        ${
  //          req.query.status_id
  //            ? ` and f.campaign_status_id IN(${req.query.status_id.split(
  //                ","
  //              )}) `
  //            : ""
  //        }
  //        ${
  //          req.query.search_term
  //            ? ` and c.campaign_name LIKE '%${req.query.search_term}%'`
  //            : ""
  //        }
  //        ${req.query.limit ? `limit  ${req.query.limit} ` : ""}
  //        ${req.query.offset ? `offset ${req.query.offset} ` : ""}
  //       `;

  // result = await sequelize.query(selectQuery, {
  //   type: sequelize.QueryTypes.SELECT,
  // });

  if (findQuery != 0) {
    res.status(200).send({
      status: 200,
      message: "Data found",
      data: findQuery,
    });
  } else {
    res.status(404).send({
      status: 404,
      message: "Campaign not found",
    });
  }
}

async function applyCampaign(req, res) {
  try {
    var influencer_id = req.params.influencer_id;
    var campaign_id = req.body.campaign_id;

    const findQuery = await tableNames.Campaign.findOne({
      where: {
        campaign_id: campaign_id,
      },
    });

    if (!findQuery) {
      res.status(404).send({
        status: 404,
        message: "Campaign not found",
      });
    } else {
      const insertQuery = tableNames.campaignApplication.create({
        campaign_id: campaign_id,
        campaign_status_id: findQuery["campaign_status_id"],
        influencer_id: influencer_id,
        application_status_id: 1,
      });

      if (insertQuery != "") {
        res.status(200).send({
          status: 200,
          message: "Successfully applied",
        });
      } else {
        res.status(404).send({
          status: 404,
          message: "Try again",
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: error,
    });
  }
}
module.exports = {
  getCampaignDetails,
  getCampaigns,
  getDemoCampaigns,
  getCampaignApplications,
  applyCampaign,
};
