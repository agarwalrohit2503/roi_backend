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
            await tableNames.campaignApplicationContent.create(
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

  // console.log(filesLinks + content_link);

  // let filesLinks = {};

  // if (files.lenght != 0) {
  //   files.map(async (item) => {
  //     try {
  //       var finalImgeUrl = await imageWithPdfUpload(item, file_type);

  //       filesLinks.push({image:{finalImgeUrl}});
  //     } catch (error) {
  //       console.error(`Error processing image for ${item}:`, error);
  //     }
  //   });
  // }
  // console.log(filesLinks);

  //console.log(filesLinks);

  // var addInfluencerApplicationcontentRespData = "";
  // if (image_file != "") {
  //    addInfluencerApplicationcontentRespData = await Promise.all(
  //     image_file.map(async (item) => {
  //       if (item) {
  //         var finalImgeUrl = await imageWithPdfUpload(item, file_type);

  //         if (finalImgeUrl == "" || finalImgeUrl == null) {
  //           res.status(209).send({
  //             status: 209,
  //             message: "influencer content Not Uploaded",
  //           });
  //         }
  //         console.log(finalImgeUrl);

  //         var influencerContentInfo = {
  //           influencer_id: influencer_id,
  //           campaign_applied_id: campaign_applied_id,
  //           image_file: finalImgeUrl,
  //         };

  //         const influencerContentUploadCreateQuery =
  //           await tableNames.campaignApplicationContent.create(
  //             influencerContentInfo
  //           );

  //         return influencerContentUploadCreateQuery;
  //       } else {
  //         console.log("dfdf");
  //       }
  //     })
  //   );

  //   console.log("dsa");
  //   return addInfluencerApplicationcontentRespData;
  // }

  // // );

  // let addInfluencerContentRespData = await Promise.all(
  //   content_link.map(async (item) => {
  //     var influencerContentInfo = {
  //       influencer_id: influencer_id,
  //       campaign_applied_id: campaign_applied_id,
  //       content_link: item,
  //     };

  //     const influencerContentUploadCreateQuery =
  //       await tableNames.campaignApplicationContent.create(
  //         influencerContentInfo
  //       );

  //     return influencerContentUploadCreateQuery;
  //   })
  // );

  success(
    res,
    "Campaign Content uploaded",
    "Campaign Content Not uploaded",
    addInfluencerApplicationcontentRespData,
    1
  );
}

module.exports = {
  campaignApplicationInfluencerContent,
};
