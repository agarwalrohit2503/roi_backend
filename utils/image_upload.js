const baseName = require("./constant");
const fs = require("fs");

async function imageUpload(base64String, file_type) {
 
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    var realFile = Buffer.from(base64String, "base64");
    fs.writeFileSync("./uploads/" + uniqueSuffix + ".png", realFile);
    var imageUrl = baseName.imageUploadPath + uniqueSuffix + ".png";

    return imageUrl;
  
}
async function imageWithPdfUpload(base64String, file_type) {
  if (file_type != "") {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    var realFile = Buffer.from(base64String, "base64");
    fs.writeFileSync("./uploads/" + uniqueSuffix + ".pdf", realFile);
    var imageUrl = baseName.imageUploadPath + uniqueSuffix + ".pdf";

    return imageUrl;
  } else {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    var realFile = Buffer.from(base64String, "base64");
    fs.writeFileSync("./uploads/" + uniqueSuffix + ".png", realFile);
    var imageUrl = baseName.imageUploadPath + uniqueSuffix + ".png";

    return imageUrl;
  }
}
module.exports = {imageUpload,imageWithPdfUpload};
