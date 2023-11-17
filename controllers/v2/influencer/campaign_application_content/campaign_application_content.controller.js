const tableNames = require("../../../../utils/table_name");
const {
  imageUpload,
  imageWithPdfUpload,
} = require("../../../../utils/image_upload");
const { success, error } = require("../../../../utils/responseApi");

async function campaignApplicationInfluencerContent(req, res) {
  // var influencer_id = req.params.influencer_id;

  var campaign_applied_id = req.params.campaign_applied_id;

  var content_link = req.body.content_link;

  var files = req.body.files;

  var file_type = req.body.file_type;

  let filesLinks = [];
  console.log(`${campaign_applied_id} - ${content_link} - ${files} `);
  if (files.length != 0) {
    await Promise.all(
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

  //console.log(combinedArray);

  if (combinedArray.length != 0) {
    var data = await Promise.all(
      combinedArray.map(async (item) => {
        try {
          var influencerContentInfo = {
            campaign_applied_id: campaign_applied_id,
            link: item,
          };

          const influencerContentUploadCreateQuery =
            await tableNames.campaignApplicationContent.create(
              influencerContentInfo
            );
          if (
            influencerContentUploadCreateQuery == "" ||
            influencerContentUploadCreateQuery == null
          ) {
            error(res, "Campaign Content uploaded");
          }

          return influencerContentUploadCreateQuery;
        } catch (error) {
          res.status(500).send({
            status: 500,
            message: "Internal server error1",
          });
        }
      })
    );

    //const testdata = await Promise.all(data);

    const campaignApplicationContentStatusUpdateQuery =
      await tableNames.campaignApplication.update(
        {
          campaign_application_content_status: -1,
        },
        { where: { campaign_applied_id: campaign_applied_id } }
      );

    success(
      res,
      "Campaign Content uploaded",
      "Campaign Content Not uploaded",
      campaignApplicationContentStatusUpdateQuery,
      1
    );
  }
}

module.exports = {
  campaignApplicationInfluencerContent,
};
