const tableNames = require("../../../../utils/table_name");
const {
  imageUpload,
  imageWithPdfUpload,
} = require("../../../../utils/image_upload");
const { success, error } = require("../../../../utils/responseApi");

async function campaignApplicationInfluencerLink(req, res) {
  // var influencer_id = req.params.influencer_id;

  var campaign_applied_id = req.params.campaign_applied_id;

  var content_link = req.body.content_link;

  var files = req.body.files;

  var file_type = req.body.file_type;

  let filesLinks = [];

  if (files.length != 0) {
    var addInfluencerApplicationcontentRespData = await Promise.all(
      files.map(async (item) => {
        console.log(item);

        try {
          var finalImageUrl = await imageWithPdfUpload(
            item["file_base64"],
            item["file_type"]
          );
          //  console.log({ finalImageUrl });
          filesLinks.push(finalImageUrl);
        } catch (error) {
          res.status(500).send({
            status: 500,
            message: "Internal server error1",
          });
        }
      })
    );
  }

  let combinedArray = filesLinks.concat(content_link);

  console.log(combinedArray);

  if (combinedArray.length != 0) {
    await Promise.all(
      combinedArray.map(async (item) => {
        try {
          var influencerContentInfo = {
            campaign_applied_id: campaign_applied_id,
            link: item,
          };

          const influencerContentUploadCreateQuery =
            await tableNames.campaignApplicationLink.create(
              influencerContentInfo
            );
          return influencerContentUploadCreateQuery;
        } catch (error) {
          res.status(500).send({
            status: 500,
            message: "Internal server error1",
          });
        }
      })
    );
  }

  success(
    res,
    "Influencer application link uploaded",
    "Campaign application Not uploaded",
    addInfluencerApplicationcontentRespData,
    1
  );
}

module.exports = {
  campaignApplicationInfluencerLink,
};
