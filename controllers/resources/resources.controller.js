const tableNames = require("../../utils/table_name");

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
    state_id: state_id
  };
  let paranoid = { paranoid: true }
  findQuery = await tableNames.City.findAll({
    attributes: ["city_id", "state_id", "city_name"],
    where,
    paranoid
    
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

async function getBusinessList(req, res) {

  fondQuery = await tableNames.Industry.findAll({
    attributes:['industry_id','industry_name'],
    where:{
      delete_flag:0
    }
  })
  if (fondQuery != '') {
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
module.exports = {
  getCity,
  getState,
  getContentNiche,
  getBusinessList,
};
