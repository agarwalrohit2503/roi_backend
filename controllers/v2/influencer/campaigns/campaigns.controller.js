const tableNames = require("../../../../utils/table_name");
const operatorsAliases = require("../../../../utils/operator_aliases");
const { success, error } = require("../../../../utils/responseApi");

async function getCampaigns(req, res) {
  var influencer_id = req.query.influencer_id;
  var limit = req.query.limit;
  var offset = req.query.offset;
  var search_term = req.query.search_term;

  try {
    const findQuery = await tableNames.Campaign.findAll({
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
            "influencer_type_id",
            "campaign_id",
            "post",
            "story",
            "reels",
            "youtube",
          ],
          model: tableNames.campaignDeliverables,
        },
        {
          model: tableNames.campaignNumberOfInfluencers,
        },
        {
          model: tableNames.campaignTargetAdienceAgeGroup,
        },
        {
          model: tableNames.campaignTargetAudienceGender,
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

        ...(influencer_id
          ? [
              {
                attributes: ["influencer_id"],
                model: tableNames.campaignApplication,
                required: false,
                where: {
                  influencer_id: influencer_id,
                  delete_flag: 0,
                },
              },
            ]
          : ""),

        {
          attributes: ["campaign_language_id"],
          model: tableNames.campaignLanguage,
          required: false,
          include: [
            {
              model: tableNames.language,
            },
          ],
        },
        {
          model: tableNames.campaignImages,
        },
      ],
      where: {
        ...(search_term
          ? { campaign_name: { [operatorsAliases.$like]: `%${search_term}%` } }
          : {}),
        campaign_delete: 0,
      },
      order: [["campaign_id", "DESC"]],
      offset: Number.parseInt(offset ? offset : 0),
      limit: Number.parseInt(limit ? limit : 20),
      subQuery: true,
    });

    success(res, "Campaign Data found", "Campaign Data Not Found", findQuery);
  } catch (err) {
    error(res, "Internal server error", err);
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
            "influencer_type_id",
            "campaign_id",
            "post",
            "story",
            "reels",
            "youtube",
          ],
          model: tableNames.campaignDeliverables,
        },
        {
          model: tableNames.campaignNumberOfInfluencers,
        },
        {
          model: tableNames.campaignTargetAdienceAgeGroup,
        },
        {
          model: tableNames.campaignTargetAudienceGender,
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
        {
          attributes: ["campaign_language_id"],
          model: tableNames.campaignLanguage,
          include: [
            {
              model: tableNames.language,
            },
          ],
        },
        {
          model: tableNames.campaignImages,
        },
      ],

      where: {
        campaign_id: campaign_id,
      },
    });
    success(
      res,
      "Campaign Details found",
      "Campaign Details Not Found",
      findQuery
    );
  } catch (e) {
    error(res, "Internal server error", e);
  }
}

async function getDemoCampaigns(req, res) {
  getCampaigns(req, res);
}

async function getCampaignApplications(req, res) {
  //try {
  influencer_id = req.params.influencer_id;

  var limit = req.query.limit;
  var offset = req.query.offset;
  var search_term = req.query.search_term;
  var status_id = req.query.status_id;

  const findQuery = await tableNames.campaignApplication.findAll({
    attributes: ["campaign_applied_id"],
    include: [
      {
        // attributes: [
        //   "campaign_id",
        //   "campaign_name",
        //   "location",
        //   "image_link",
        //   "campaign_budget",
        //   "campaign_about",
        //   "campaign_start_dt",
        //   "campaign_end_dt",
        // ],
        model: tableNames.Campaign,
        required: false,
        include: [
          {
            attributes: ["campaign_payment_type_id", "name"],
            model: tableNames.campaignPaymentType,
            required: false,
          },
          {
            model: tableNames.campaignContentNiche,

            include: [
              {
                attributes: ["content_niche_id", "content_niche_name"],
                model: tableNames.contentNiche,
                required: false,
                // as: "cc",
              },
            ],
          },
          {
            attributes: ["brands_id", "brand_logo", "name"],
            model: tableNames.brands,
            required: false,
            include: [
              {
                attributes: ["state_id", "state_name"],
                model: tableNames.State,
                required: false,
              },
              {
                attributes: ["city_id", "city_name"],
                model: tableNames.City,
                required: false,
              },
            ],
          },
          {
            attributes: ["campaign_language_id"],
            model: tableNames.campaignLanguage,
            required: false,
            include: [
              {
                model: tableNames.language,
                required: false,
              },
            ],
          },
          {
            model: tableNames.campaignImages,
            required: false,
          },
        ],
        // as: "brand",
      },
      {
        model: tableNames.applicationStatus,
        required: false,
      },
      {
        model: tableNames.campaignStatus,
        required: false,
      },
    ],

    where: {
      influencer_id: influencer_id,
      application_status_id: status_id,
      delete_flag: 0,
      ...(search_term
        ? { campaign_name: { [operatorsAliases.$like]: `%${search_term}%` } }
        : {}),
    },
    subQuery: true,
    offset: Number.parseInt(offset ? offset : 0),
    limit: Number.parseInt(limit ? limit : 20),
  });

  success(
    res,
    "Campaign Applications Data found",
    "Campaign Applications Data Not Found",
    findQuery
  );
  // } catch (error) {
  //   error(res, "Internal server error", error);
  // }
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

      //error(res, "Campaign not found");
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
        // error(res, "Successfully applied");
      } else {
        res.status(404).send({
          status: 404,
          message: "Try again",
        });
        // error(res, "Try again");
      }
    }
  } catch (error) {
    // res.status(500).send({
    //   status: 500,
    //   message: error,
    // });
    error(res, "Internal server error", error);
  }
}

async function campaignApplicationRemove(req, res) {
  var campaign_id = req.body.campaign_id;
  var campaign_applied_id = req.query.campaign_applied_id;
  var influencer_id = req.params.influencer_id;

  if (campaign_id == "" || campaign_id == null || campaign_id == 0) {
    return res
      .status(409)
      .send({ status: 409, message: "campaign id is empty" });
  }
  try {
    let influencerCampaignApplicationRemovedParameters = {
      delete_flag: 1,
    };
    const influencerCampaignApplicationUpdateQuery =
      await tableNames.campaignApplication.update(
        influencerCampaignApplicationRemovedParameters,
        {
          where: {
            influencer_id: influencer_id,
            campaign_id: campaign_id,
            campaign_applied_id: campaign_applied_id,
          },
        }
      );

    if (influencerCampaignApplicationUpdateQuery[0] != "") {
      res.status(200).send({
        status: 200,
        message: "Influencer Application delete",
      });
    } else {
      res.status(409).send({
        status: 409,
        message: "Influencer Application is not updated",
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
  getCampaignDetails,
  getCampaigns,
  getDemoCampaigns,
  getCampaignApplications,
  applyCampaign,
  campaignApplicationRemove,
};
