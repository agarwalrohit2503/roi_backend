const Facebook = require("facebook-js-sdk");

async function fbTokenAccess(value) {
  var facebook = new Facebook({
    appId: "635339838813094",
    appSecret: "78afb793f5c2816775bf34043309f0c8",
    redirectUrl: "http://localhost/callback",
    graphVersion: "v18.0",
  });
  return facebook;
}

module.exports = Object.freeze(fbTokenAccess);
