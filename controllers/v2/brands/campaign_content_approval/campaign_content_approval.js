const tableNames = require("../../../../utils/table_name");
const { success, error } = require("../../../../utils/responseApi");
const {
  imageUpload,
  imageWithPdfUpload,
} = require("../../../../utils/image_upload");

async function campaignContentApproval(req, res) {
  try {
    var comment_id = req.params.comment_id;
    var content_approval_status = req.body.content_approval_status;

    if (
      comment_id == null ||
      comment_id == "" ||
      content_approval_status == null ||
      content_approval_status == ""
    ) {
      error(res, "comment_id and content_approval_status not define");
    } else {
      const contentUploadUpdateQuery = await tableNames.Comments.update(
        {
          content_approval_status: content_approval_status,
        },
        { where: { comment_id: comment_id } }
      );

      success(
        res,
        "Influencer Content updated",
        "Influencer Content Not updated",
        contentUploadUpdateQuery,
        1
      );
    }
  } catch (err) {
    error(res, "Internal server error");
  }
}

module.exports = {
  campaignContentApproval,
};
