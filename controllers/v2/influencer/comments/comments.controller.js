const tableNames = require("../../../../utils/table_name");
const { db, sequelize } = require("../../../../utils/conn");

async function addComments() {}

async function getComments(req, res) {
  var campaign_id = req.params.campaign_id;
  var limit = req.query.limit;
  var offset = req.query.offset;
  const findQuery = await tableNames.Comments.findAll({
    where: {
      campaign_id: campaign_id,
      delete_flag: 0,
    },
    offset: Number.parseInt(offset ? offset : 0),
    limit: Number.parseInt(limit ? limit : 20),
  });
  order: [["campaign_applied_id", "DESC"]],
    res.status(200).send({
      status: 200,
      message: "Brand",
      data: findQuery,
    });
}

async function deleteComments() {}
module.exports = {
  addComments,
  getComments,
  deleteComments,
};
