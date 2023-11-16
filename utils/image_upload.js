const baseName = require("./constant");
const fs = require("fs");
const tableNames = require("../utils/table_name");

async function imageUpload(base64String, campaign_id = "") {
  if (campaign_id != "") {
    const allData = await base64String.map(async (url) => {
      try {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        var realFile = Buffer.from(url, "base64");
        fs.writeFileSync("./uploads/" + uniqueSuffix + ".png", realFile);
        var imageUrl = baseName.imageUploadPath + uniqueSuffix + ".png";

        let imageData = {
          image_link: imageUrl,
          campaign_id: campaign_id,
        };
        var imageUploadResp = await tableNames.campaignImages.create(imageData);

        return imageUploadResp;
      } catch (err) {
        return err;
      }
    });
    return Promise.all(allData);
  } else {
    try {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      var realFile = Buffer.from(base64String, "base64");
      fs.writeFileSync("./uploads/" + uniqueSuffix + ".pdf", realFile);
      var imageUrl = baseName.imageUploadPath + uniqueSuffix + ".pdf";
      return imageUrl;
    } catch (err) {
      return err;
    }
  }
}
async function imageWithPdfUpload(base64String, file_type) {
  if (file_type != "image") {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    var realFile = Buffer.from(base64String, "base64");
    fs.writeFileSync("./uploads/" + uniqueSuffix + `.${file_type}`, realFile);
    var imageUrl = baseName.imageUploadPath + uniqueSuffix + `.${file_type}`;

    return imageUrl;
  } else {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    var realFile = Buffer.from(base64String, "base64");
    fs.writeFileSync("./uploads/" + uniqueSuffix + ".png", realFile);
    var imageUrl = baseName.imageUploadPath + uniqueSuffix + ".png";

    return imageUrl;
  }
}
module.exports = { imageUpload, imageWithPdfUpload };
