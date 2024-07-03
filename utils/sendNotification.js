const https = require("https");
async function sendNotification(
  user_id,
  contents,
  headings
) {
  return new Promise((resolve, reject) => {
    
    const oneSignalAppId = "d909bfa8-2e1b-49ea-9b39-f194dfed3dfb";//process.env.ONESIGNAL_APP_ID;

    const message = {
      app_id: oneSignalAppId,
      contents: { en: contents },
      headings: { en: headings },
      // android_channel_id: 'f1397e74-5fe1-4815-9e06-5ea2f82ffd53',
      ios_sound: "alert.wav",
      // channel_for_external_user_ids: 'push',
     // include_player_ids: ["03b83d22-0e3a-4298-abe4-fead80b3165e"],
      include_external_user_ids: [user_id],
      // data: {
      //   routes: booking_notification,
      //   ...(inbox_id
      //     ? {
      //       inbox_id: inbox_id,
      //     }
      //     : ""),
      //   ...(isuser
      //     ? {
      //       IsUser: isuser,
      //     }
      //     : ""),
      // },
    };
    console.log(message);
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Basic ZDYxZGMxMTUtY2U1Mi00MjU4LWI5NWYtMDQyMWI5MGYwZWUx`,//MzBmYTE4NjItY2I3YS00N2EyLWEyNjctMWU5MmQyZmY1YmZj`,//${process.env.ONESIGNAL_TOKEN}`,
    };
    const options = {
      host: "onesignal.com",
      port: 443,
      path: "/api/v1/notifications",
      method: "POST",
      headers: headers,
    };

    const req = https.request(options, function (res) {
      let data = '';

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        console.log("===================================");
        console.log(data.toString());
        resolve(true);  // Resolve the promise with `true` if successful
      });
    });

    req.on("error", (e) => {
      console.error(e);
      reject(false);  // Reject the promise with `false` if an error occurs
    });

    req.write(JSON.stringify(message));
    req.end();
  });
}

module.exports = sendNotification;