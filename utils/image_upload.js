const baseName = require("./constant");
const fs = require("fs");

async function imageUpload(base64String) {
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  var realFile = Buffer.from(base64String, "base64");
  fs.writeFileSync("./uploads/" + uniqueSuffix + ".png", realFile);
  var imageUrl = baseName.imageUploadPath + uniqueSuffix + ".png";

  return imageUrl;
}
module.exports = imageUpload;
