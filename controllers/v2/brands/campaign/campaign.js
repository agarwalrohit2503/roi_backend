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

async function editCampaign(req, res) {
  var brand_id = req.params.brand_id;
  var campaign_id = req.body.campaign_id;

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
  var platform = req.body.platform;
  var eligibility = req.body.eligibility;

  try {
    const updateQuery = await tableNames.Campaign.update(
      {
        campaign_status_id: campaign_status_id,
        payment_status_id: payment_status_id,
        campaign_name: campaign_name,
        location: location,
        campaign_about: campaign_about,
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
  var platform = req.body.platform;
  var eligibility = req.body.eligibility;
  var campaign_goal_id = req.body.campaign_goal_id;
  //   var  post = req.body.post;
  // var  story = req.body.story;
  // var  real = req.body.real;
  // var  youtube = req.body.youtube;
  // var  video = req.body.video;

  try {
    const createQuery = await tableNames.Campaign.create({
      campaign_goal_id: campaign_goal_id,
      brand_id: brand_id,
      campaign_status_id: campaign_status_id,
      payment_status_id: payment_status_id,
      campaign_name: campaign_name,
      location: location,
      campaign_about: campaign_about,
      language: language,
      campaign_start_dt: campaign_start_dt,
      campaign_end_dt: campaign_end_dt,
      campaign_budget: campaign_budget,
      image_link: image_link,
      platform: platform,
      eligibility: eligibility,
    });
    //  console.log(createQuery);
    console.log(createQuery.campaign_id);
    if (createQuery != "") {
      res.status(200).send({
        status: 200,
        message: "Campaign created",
      });

      
    } else {
      res.status(409).send({
        status: 409,
        message: "Campaign not created ",
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
      message: "Data found",
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
module.exports = {
  getAllCampaign,
  deleteCampaign,
  editCampaign,
  addCampaign,
  getCampaignDetails,
};
