const tableNames = require("../../../../utils/table_name");
const operatorsAliases = require("../../../../utils/operator_aliases");

async function getCampaigns(req, res) {
  var limit = req.query.limit;
  var offset = req.query.offset;
  var search_term = req.query.search_term;

  try {
    const findQuery = await tableNames.Campaign.findAll({
      attributes: [
        "campaign_id",
        "campaign_name",
        "location",
        "language",
        "image_link",
        "campaign_budget",
        "campaign_start_dt",
        "campaign_end_dt",
      ],
      include: [
        {
          attributes: ["brands_id", "brand_logo", "name"],
          model: tableNames.brands,
          as: "brand",
        },
      ],
      order: [
        ["createdAt", "DESC"],
        // ['name', 'ASC'],
      ],
      //raw: true,
      where: {
        ...(search_term
          ? { campaign_name: { [operatorsAliases.$like]: `%${search_term}%` } }
          : {}),
        delete_flag: 0,
        // campaign_status_id: 1,
      },
      offset: Number.parseInt(offset ? offset : 0),
      limit: Number.parseInt(limit ? limit : 20),
      //subQuery: true,
    });

    res.status(200).send({
      status: 200,
      message: "Data found",
      data: findQuery,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "error Found",
      data: error,
    });
  }
}

async function getCampaignDetails(req, res) {
  const campaign_id = req.params.campaign_id;

  // try {
  const findQuery = await tableNames.Campaign.findOne({
    attributes: [
      "campaign_id",
      "campaign_name",
      "location",
      "campaign_about",
      "language",
      "image_link",
      "platform",
      "eligibility",
      "campaign_budget",
      "campaign_start_dt",
      "campaign_end_dt",
    ],
    include: [
      {
        attributes: ["brands_id", "brand_logo", "name"],
        model: tableNames.brands,
        as: "brand",
      },
      {
        attributes: ["campaign_payment_type_id", "name"],
        model: tableNames.campaignPaymentType,
        // as: "payment_status",
      },

      {
        //attributes: ["content_niche_id ", "content_niche_name"],
        model: tableNames.campaignContentNiche,
        // as: "payment_status",
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
    message: "Data found",
    data: findQuery ? findQuery : [],
  });

  // } catch (error) {
  //   res.status(500).send({
  //     status: 500,
  //     message: "Data found",
  //     data: error,
  //   });
}

async function addCampaigns(req, res) {
  Name = req.body.Name;

  test = ["1,2,3"];
  sqlQuery = `INSERT INTO  ${tableNames.campaign}
    (brand_id) 
    VALUES ('${test}')`;

  result = await sequelize.query(sqlQuery, {
    type: sequelize.QueryTypes.INSERT,
  });
  if (result.length != 0) {
    res.status(200).send({
      status: 200,
      message: "Data found",
      data: result,
    });
  } else {
    res.status(404).send({
      status: 404,
      message: "INTERNAL ERROR",
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
          "campaign_budget",
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
module.exports = {
  addCampaigns,
  getCampaignDetails,
  getCampaigns,
  getDemoCampaigns,
  getCampaignApplications,
};
