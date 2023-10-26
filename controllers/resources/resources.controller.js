const tableNames = require("../../utils/table_name");
const { success, error } = require("../../utils/responseApi");

async function getState(req, res) {
  try {
    findQuery = await tableNames.State.findAll({
      attributes: ["state_id", "state_name"],
      where: { delete_flag: 0 },
    });
    if (findQuery != "") {
      res.status(200).send({
        status: 200,
        message: "Data found",
        data: findQuery,
      });
    } else {
      res.status(404).send({
        status: 404,
        message: "Not found",
      });
    }
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Internal server error",
    });
  }
}

async function getCity(req, res) {
  state_id = req.query.state_id;

  let where = {
    delete_flag: 0,
    state_id: state_id,
  };
  let paranoid = { paranoid: true };
  findQuery = await tableNames.City.findAll({
    attributes: ["city_id", "state_id", "city_name"],
    where,
    paranoid,
  });

  if (findQuery != "") {
    res.status(200).send({
      status: 200,
      message: "Data found",
      data: findQuery,
    });
  } else {
    res.status(404).send({
      status: 404,
      message: "No cities found",
    });
  }
}

async function getContentNiche(req, res) {
  try {
    findQuery = await tableNames.contentNiche.findAll({
      attributes: ["content_niche_id", "content_niche_name", "image_link"],
      where: { delete_flag: 0 },
    });

    if (findQuery != "0") {
      res.status(200).send({
        status: 200,
        message: "Content Niche data",
        data: findQuery,
      });
    } else {
      res.status(404).send({
        status: 404,
        message: "INTERNAL ERROR",
      });
    }
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Internal server error",
    });
  }
}

async function getBrandType(req, res) {
  try {
    findQuery = await tableNames.brandType.findAll({
      attributes: ["brand_type_id", "brand_type_name"],
      where: { delete_flag: 0 },
    });

    if (findQuery != "0") {
      res.status(200).send({
        status: 200,
        message: "Brand Type",
        data: findQuery,
      });
    } else {
      res.status(404).send({
        status: 404,
        message: "INTERNAL ERROR",
      });
    }
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Internal server error",
    });
  }
}

async function getBusinessList(req, res) {
  fondQuery = await tableNames.Industry.findAll({
    attributes: ["industry_id", "industry_name"],
    where: {
      delete_flag: 0,
    },
  });
  if (fondQuery != "") {
    res.status(200).send({
      status: 200,
      message: "Industry",
      data: fondQuery,
    });
  } else {
    res.status(404).send({
      status: 404,
      message: "Not Found",
    });
  }
}

async function getCampaignPaymentType(req, res) {
  try {
    findQuery = await tableNames.campaignPaymentType.findAll({
      attributes: ["campaign_payment_type_id", "name"],
      where: { campaign_delete: 0 },
    });

    res.status(200).send({
      status: 200,
      message: findQuery != "" ? "Data found" : "Data not found",
      data: findQuery,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Internal server error",
    });
  }
}

async function getPlatform(req, res) {
  const findQueryPlatform = await tableNames.Platform.findAll({
    attributes: ["platform_id", "platform_name", "platform_img"],
    where: { delete_flag: 0 },
  });
  res.status(200).send({
    status: 200,
    message: findQueryPlatform != "" ? "Data found" : "Data not found",
    data: findQueryPlatform,
  });
}

async function getCampaignGoal(req, res) {
  const findQueryCampaignGoal = await tableNames.campaignGoal.findAll({
    attributes: ["campaign_goal_id", "goal_name", "goal_desc"],
    where: { delete_flag: 0 },
  });
  res.status(200).send({
    status: 200,
    message: findQueryCampaignGoal != "" ? "Data found" : "Data not found",
    data: findQueryCampaignGoal,
  });
}

async function getLanguageList(req, res) {
  var limit = req.query.limit;
  var offset = req.query.offset;
  var search_term = req.query.search_term;

  const getLanguageListFindQuery = await tableNames.language.findAll({
    where: { delete_flag: 0 },
  });

  success(
    res,
    "Language Details Found",
    "Language Details Not Found",
    getLanguageListFindQuery
  );
}
module.exports = {
  getCity,
  getState,
  getContentNiche,
  getBusinessList,
  getBrandType,
  getCampaignPaymentType,
  getPlatform,
  getCampaignGoal,
  getLanguageList,
};
