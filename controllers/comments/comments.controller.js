const tableNames = require("../../utils/table_name");
const { db, sequelize } = require("../../utils/conn");

async function addComments(req, res) {
  var campaign_applied_id = req.body.campaign_applied_id;
  var influencer_id = req.body.influencer_id;
  var brand_id = req.body.brand_id;
  var sender_type = req.body.sender_type;
  console.log(sender_type);
  var comment_text = req.body.comment_text;
  var comment_file = req.body.comment_file;

  // if (
  //   campaign_applied_id == "" ||
  //   campaign_applied_id == null ||
  //   campaign_applied_id == 0 ||
  //   influencer_id == "" ||
  //   influencer_id == null ||
  //   influencer_id == 0 ||
  //   brand_id == "" ||
  //   brand_id == null ||
  //   brand_id == 0
  // ) {
  //   return res.status(409).send({
  //     status: 409,
  //     message: "campaign applied id & influencer id is not match",
  //   });
  // }

  let commentAddParameter = {
    campaign_applied_id: campaign_applied_id,
    influencer_id: influencer_id,
    brand_id: brand_id,
    sender_type: sender_type,
    comment_text: comment_text,
    comment_file: comment_file,
  };

  var commentAddQuery = await tableNames.Comments.create(commentAddParameter);

  console.log(commentAddQuery);
  res.status(200).send({
    status: 200,
    message: commentAddQuery != "" ? "Comments added" : "No comments added",
   // data: commentAddQuery,
  });
}

async function getinfluencerComments(req, res) {
  var campaign_applied_id = req.params.campaign_applied_id;
  var limit = req.query.limit;
  var offset = req.query.offset;

  if (
    campaign_applied_id == "" ||
    campaign_applied_id == null ||
    campaign_applied_id == 0
  ) {
    return res.status(409).send({
      status: 409,
      message: "campaign applied id is not match",
    });
  }
  const campaignCommentFindQuery = await tableNames.Comments.findAll({
    include: [
      {
        attributes: ["influencer_id", "name"],
        model: tableNames.influencer,
      },
      {
        attributes: ["brands_id", "name", "brand_logo"],
        model: tableNames.brands,
      },
    ],
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
    message: campaignCommentFindQuery != "" ? "Data found" : "Data not found",
    data: campaignCommentFindQuery,
  });
}

async function getBrandsComments(req, res) {
  var campaign_applied_id = req.params.campaign_applied_id;
  var influencer_id = req.params.influencer_id;
  var limit = req.query.limit;
  var offset = req.query.offset;

  if (
    campaign_applied_id == "" ||
    campaign_applied_id == null ||
    campaign_applied_id == 0 ||
    influencer_id == "" ||
    influencer_id == null ||
    influencer_id == 0
  ) {
    return res.status(409).send({
      status: 409,
      message: "campaign applied id & influencer id is not match",
    });
  }
  const campaignCommentFindQuery = await tableNames.Comments.findAll({
    include: [
      {
        attributes: ["influencer_id", "name"],
        model: tableNames.influencer,
      },
      {
        attributes: ["brands_id", "name", "brand_logo"],
        model: tableNames.brands,
      },
    ],
    where: {
      campaign_applied_id: campaign_applied_id,
      influencer_id: influencer_id,
      delete_flag: 0,
    },
    order: [["comment_id", "DESC"]],
    offset: Number.parseInt(offset ? offset : 0),
    limit: Number.parseInt(limit ? limit : 20),
  });

  res.status(200).send({
    status: 200,
    message: campaignCommentFindQuery != "" ? "Data found" : "Data not found",
    data: campaignCommentFindQuery,
  });
}

async function deleteComments(req, res) {
  var comment_id = req.params.comment_id.split(",");

  console.log(comment_id);

  var comments_delete = comment_id.map(async (item) => {
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
  getinfluencerComments,
  getBrandsComments,
  deleteComments,
};