const tableNames = require("../../../../utils/table_name");
const { db, sequelize } = require("../../../../utils/conn");

async function addComments() {}

async function getComments(req, res) {
  var campaign_applied_id = req.params.campaign_applied_id;
  var limit = req.query.limit;
  var offset = req.query.offset;
  const findQuery = await tableNames.Comments.findAll({
    where: {
      campaign_applied_id: campaign_applied_id,
      delete_flag: 0,
    },
    order: [["comment_id", "DESC"]],
    offset: Number.parseInt(offset ? offset : 0),
    limit: Number.parseInt(limit ? limit : 20),
  });

  res.status(200).send({
    status: 200,
    message: "Brand",
    data: findQuery,
  });
}

async function deleteComments() {
  var comment_id = req.params.comment_id;

  const comments_delete = comment_id.map(async (item) => {
    return (commentDeleteQuery = await tableNames.Comments.destroy({
      where: {
        comment_id: item,
      },
    }));
  });

  const respData = await Promise.all(comments_delete);
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
  addComments,
  getComments,
  deleteComments,
};
