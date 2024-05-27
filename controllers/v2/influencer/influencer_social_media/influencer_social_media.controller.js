const tableNames = require("../../../../utils/table_name");
const operatorsAliases = require("../../../../utils/operator_aliases");
const https = require('https');
const path = require("path");
const dotenv = require("dotenv").config({
  path: path.resolve(process.cwd(), ".env"),
});
const { success, error } = require("../../../../utils/responseApi");
// const fbTokenAccess = require("../../../../utils/fb_secret_keys");
const Facebook = require("facebook-js-sdk");

const facebook = new Facebook({
  appId: process.env.appId,
  appSecret: process.env.appSecret,
  redirectUrl: process.env.redirectUrl,
  graphVersion: process.env.graphVersion,
});

async function addInfluencerSocialMediaDetails(req, res) {
  var influencer_id = req.params.influencer_id;
  // var fb_access_token = req.body.fb_access_token;

  facebook.setAccessToken("EAAZAZBZAMrLIo0BOzArYXxH9vcWcc3i5Jt2N1RyziM9Lpq5Ri92jHc9ySkWeyfCioyhz6pe47JP4wyLyLIRbfxrJmYdlJTDmNi7zH8udXtVZCBZAQzi9xXZBqjZAvW96ZCNs3EP7FTdQ4PHncs1bZBvHP3FaMlkJg6GY3enp9O9nBlRkcu0j9XZBIP3Jb1orpjVBhYuywGCN2WS1GN7fwZD");

  var facebookUserDetails = await facebook.get(
    // "/me?fields=id,name,birthday,age_range,posts{full_picture,permalink_url}"
    "fields=phone%2Cfollowers_count%2Clocation%2Cname%2Cpage_token%2Cusername%2Cwebsite%2Cinstagram_business_account%2Cemails%2Cphotos%2Cpicture%2Ccover%2Cfeed%2Cconnected_instagram_account&access_token=EAAZAZBZAMrLIo0BO82kjk9aGmJosQ9uLka4sjrDrR61C4ZBGFx80eAxgwWU491sabsZA8Dkn4jHfYIuKwFwYcSlIi1eZC2jEvqMzlSEZAq09xyGMqotNxB2IpWpGigQMzyqyTtO4FaFis5gA3W9LgyX4QFe7ieZCwzodKfQ1Ai65byH9VbIYwMt94aadW2oWV36ZBnOI9t5cOPH8ZATc0ZD"
  );

  if (facebookUserDetails.data != null || facebookUserDetails.data != "") {
    try {
      // var name = response.data.name;
      // res.send(name);

      console.log(facebookUserDetails.data.id);
      console.log(facebookUserDetails.data.name);
      console.log(facebookUserDetails.data.birthday);
      console.log(facebookUserDetails.data.age_range.min);
      console.log(facebookUserDetails.data.link);
      console.log(facebookUserDetails.data.gender);
      console.log(facebookUserDetails.data.location.name);

      //JSON RESP BODY

      fbInfluencerDetails = {
        influencer_id: influencer_id,
        fb_user_id: facebookUserDetails.data.id,
        name: facebookUserDetails.data.name,
        birthday: facebookUserDetails.data.birthday,
        age_range: facebookUserDetails.data.age_range.min,
        profile_link: facebookUserDetails.data.link,
        gender: facebookUserDetails.data.gender,
        location: facebookUserDetails.data.location.name,
      };

      const fbinfluencerinsertQuery =
        await tableNames.influencerFacebook.create(fbInfluencerDetails);

      success(
        res,
        "Influencer facebook details inserted",
        "Influencer facebook details not inserted, please try again",
        fbinfluencerinsertQuery
      );
    } catch (err) {
      error(res, "INERNAL SERVER ERROR", 404);
    }
  } else {
    error(res, "Facebook Details Not Found", 404);
  }
}



//////////////////////YOUTUBE API START////////////////////////////////
async function addInfluencerYoutubeChannel(req, res) {
  const { influencer_id } = req.params;
  const { email, google_token } = req.body;

  try {
    const influencer = await findInfluencer(influencer_id);
    if (!influencer) {
      return error(res, "Influencer not found",);
    }

    const youtubeData = await fetchYoutubeChannelDetails(google_token);
    if (!youtubeData) {
      return error(res, "Failed to fetch YouTube data",);
    }

    const youtubeVideoList = await fetchYoutubeChannelVideoList(google_token);
    if (!youtubeVideoList) {
      return error(res, "Failed to fetch YouTube channel list video",);
    }

    const isInfluencerConnected = await checkInfluencerConnection(influencer_id);
    if (isInfluencerConnected) {
      return error(res, "Influencer Account Already Connected",);
    }

    const savedInfluencerData = await saveInfluencerYoutubeData(influencer_id, youtubeData,youtubeVideoList);
    if (!savedInfluencerData) {
      return error(res, "Failed to save influencer data",);
    }

    success(res, "Influencer YouTube details inserted", "Influencer YouTube details not inserted, please try again", savedInfluencerData);
  } catch (err) {
   
    return error(res, "Internal Server Error",);
  }
}

async function findInfluencer(influencer_id) {
  return await tableNames.influencer.findOne({
    where: {
      influencer_id: influencer_id,
      account_delete: 0
    }
  });
}

function fetchYoutubeChannelDetails(google_token) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'youtube.googleapis.com',
      port: 443,
      path: '/youtube/v3/channels?part=id,snippet,statistics,status,topicDetails,contentOwnerDetails,contentDetails,brandingSettings,auditDetails&mine=true',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${google_token}`
      }
    };

    const reqSent = https.request(options, (youtubeRes) => {
      let data = '';

      youtubeRes.on('data', (chunk) => {
        data += chunk;
      });

      youtubeRes.on('end', () => {
        try {
          const jsonResponse = JSON.parse(data);
          resolve(jsonResponse?.items[0]);
        } catch (error) {
          console.error('Error parsing JSON:', error);
          reject(null);
        }
      });
    });

    reqSent.on('error', (e) => {
      console.error(`Problem with request: ${e.message}`);
      reject(null);
    });

    reqSent.end();
  });
}

function fetchYoutubeChannelVideoList(google_token) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'youtube.googleapis.com',
      port: 443,
      path: '/youtube/v3/activities?part=id%2CcontentDetails%2Csnippet&mine=true',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${google_token}`
      }
    };

    const reqSent = https.request(options, (youtubeRes) => {
      let data = '';

      youtubeRes.on('data', (chunk) => {
        data += chunk;
      });

      youtubeRes.on('end', () => {
        try {
          const jsonResponse = JSON.parse(data);
          resolve(jsonResponse.items);
        } catch (error) {
          console.error('Error parsing JSON:', error);
          reject(null);
        }
      });
    });

    reqSent.on('error', (e) => {
      console.error(`Problem with request: ${e.message}`);
      reject(null);
    });

    reqSent.end();
  });
}

async function checkInfluencerConnection(influencer_id) {
  const isConnected = await tableNames.influencerYoutube.findOne({
    where: {
      influencer_id: influencer_id
    }
  });
  return isConnected !== null;
}

async function saveInfluencerYoutubeData(influencer_id, data,youtubeVideoList) {
 
  const influencerYoutubeChannelInfoQuery = await tableNames.influencerYoutube.create({
    influencer_id: influencer_id,
    channel_name: data?.snippet?.title ?? "",
    description: data?.snippet?.description ?? "",
    channel_custom_url: data?.snippet?.customUrl ?? "",
    publishedAt: data?.snippet?.publishedAt ?? "",
    channel_logo: data?.snippet?.thumbnails?.high?.url ?? "",
    country: data?.snippet?.country ?? "",
    total_view_count: data?.statistics?.viewCount ?? "",
    total_subscriber_count: data?.statistics?.subscriberCount ?? "",
    total_video_count: data?.statistics?.videoCount ?? "",
    channel_cover_url: data?.brandingSettings?.image?.bannerExternalUrl ?? ""
  });


 let campaignContentNicheRespData = await Promise.all(
  youtubeVideoList.map(async (item) => {
    

    return await tableNames.influencerYoutubeList.create({
      influencer_youtube_id:influencerYoutubeChannelInfoQuery.influencer_youtube_id,
      publishedAt:item.snippet.publishedAt,
      channelId:item.snippet.channelId,
      title:item.snippet.title,
      description:item.snippet.description,
      thumbnails:item.snippet.thumbnails.high.url,
    }); // Add the required fields
  }
  ));

   return campaignContentNicheRespData;

}
//////////////////////YOUTUBE API END////////////////////////////////

//////////////////////FACEBOOK CONNECT API START//////////////////////////////
async function addInfluencerFacebookDetails(req,res){
  const { influencer_id } = req.params;
  const { fb_user_id, fb_access_token } = req.body;

try {
  const influencer = await findInfluencer(influencer_id);
  if (!influencer) {
    return error(res, "Influencer not found",);
  }

  const facebookPageDetails = await fetchFacebookDetails(fb_user_id,fb_access_token);
  if (!facebookPageDetails) {
    return error(res, "Failed to fetch YouTube data",);
  }
  const isInfluencerConnected = await checkInfluencerConnection(influencer_id);
  if (isInfluencerConnected) {
    return error(res, "Influencer Facebook Account Already Connected",);
  }

  const savedInfluencerData = await saveInfluencerFacebookData(influencer_id, facebookPageDetails,fb_user_id,fb_access_token);
    if (!savedInfluencerData) {
      return error(res, "Failed to save influencer data",);
    }

    success(res, "Influencer Facebbok details inserted", "Influencer Facebook details not inserted, please try again", savedInfluencerData,1);

} catch (err) {
  return error(res, "Internal Server Error",);
}
}

function fetchFacebookDetails(fb_user_id,fb_access_token) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'graph.facebook.com',
      port: 443,
      path: `/v20.0/${fb_user_id}?fields=phone%2Cfollowers_count%2Clocation%2Cname%2Cpage_token%2Cusername%2Cwebsite%2Cinstagram_business_account%2Cemails%2Cphotos%2Cpicture%2Ccover%2Cfeed%2Cconnected_instagram_account&access_token=EAAZAZBZAMrLIo0BO82kjk9aGmJosQ9uLka4sjrDrR61C4ZBGFx80eAxgwWU491sabsZA8Dkn4jHfYIuKwFwYcSlIi1eZC2jEvqMzlSEZAq09xyGMqotNxB2IpWpGigQMzyqyTtO4FaFis5gA3W9LgyX4QFe7ieZCwzodKfQ1Ai65byH9VbIYwMt94aadW2oWV36ZBnOI9t5cOPH8ZATc0ZD`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${fb_access_token}`
      }
    }; 

    const reqSent = https.request(options, (youtubeRes) => {
      let data = '';

      youtubeRes.on('data', (chunk) => {
        data += chunk;
      });

      youtubeRes.on('end', () => {
        try {
          const jsonResponse = JSON.parse(data);
          resolve(jsonResponse);
        } catch (error) {
          console.error('Error parsing JSON:', error);
          reject(null);
        }
      });
    });

    reqSent.on('error', (e) => {
      console.error(`Problem with request: ${e.message}`);
      reject(null);
    });

    reqSent.end();
  });
}

async function saveInfluencerFacebookData(influencer_id, facebookPageDetails, fb_user_id, fb_access_token) {

  const influencerFacebookInsertInfoQuery = await tableNames.influencerFacebook.create({
    influencer_id: influencer_id,
    fb_user_id:fb_user_id ,
    fb_access_token:fb_access_token ,
    name:facebookPageDetails.name ??"",
    username:facebookPageDetails.username ??"",
    phone:facebookPageDetails.phone ?? "",
    followers_count:facebookPageDetails.followers_count ?? "",
    location:facebookPageDetails.location.street ??"",
    website:facebookPageDetails.website ?? "",
    picture:facebookPageDetails.picture.data.url ?? "",
    cover:facebookPageDetails.cover.source ??""
  });

   return influencerFacebookInsertInfoQuery;

}

async function checkInfluencerConnection(influencer_id) {
  const isConnected = await tableNames.influencerFacebook.findOne({
    where: {
      influencer_id: influencer_id
    }
  });
  return isConnected !== null;
}
//////////////////////FACEBOOK CONNECT API END//////////////////////////////

//////////////////////INSTAGRAM CONNECT API START//////////////////////////////
async function addInfluencerInstagramDetails(req,res){
  const { influencer_id } = req.params;
  const { instagram_user_id, instagram_access_token } = req.body;

try {
  const influencer = await findInfluencer(influencer_id);
  if (!influencer) {
    return error(res, "Influencer not found",);
  }

  const instagramPageDetails = await fetchInstagramDetails(instagram_user_id, instagram_access_token);
  if (!instagramPageDetails) {
    return error(res, "Failed to fetch Instagram data",);
  }
  const isInfluencerConnected = await checkInfluencerConnection(influencer_id);
  if (isInfluencerConnected) {
    return error(res, "Influencer Instagram Account Already Connected",);
  }

  const savedInfluencerInstaData = await saveInfluencerInstagramData(influencer_id, instagramPageDetails,instagram_user_id, instagram_access_token);
    if (!savedInfluencerInstaData) {
      return error(res, "Failed to save influencer data",);
    }

    success(res, "Influencer Instagram details inserted", "Influencer Instagram details not inserted, please try again", savedInfluencerInstaData,1);

} catch (err) {
  return error(res, "Internal Server Error",);
}
}

function fetchInstagramDetails(instagram_user_id, instagram_access_token) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'graph.facebook.com',
      port: 443,
      path: `/v20.0/${instagram_user_id}?fields=followers_count%2Cbiography%2Cfollows_count%2Cmedia_count%2Cname%2Cprofile_picture_url%2Cusername%2Cmedia%2Cwebsite%2Cstories&access_token=${instagram_access_token}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
       // 'Authorization': `Bearer ${fb_access_token}`
      }
    }; 

    const reqSent = https.request(options, (instaRes) => {
      let data = '';

      instaRes.on('data', (chunk) => {
        data += chunk;
      }); 

      instaRes.on('end', () => {
        try {
          const jsonResponse = JSON.parse(data);
          resolve(jsonResponse);
        } catch (error) {
          console.error('Error parsing JSON:', error);
          reject(null);
        }
      });
    });

    reqSent.on('error', (e) => {
      console.error(`Problem with request: ${e.message}`);
      reject(null);
    });

    reqSent.end();
  });
}

async function saveInfluencerInstagramData(influencer_id, InstagramPageDetails, instagram_user_id, instagram_access_token) {

  console.log(InstagramPageDetails);
  const influencerInstagramInsertInfoQuery = await tableNames.influencerInstagram.create({
    influencer_id: influencer_id,
    instagram_user_id:instagram_user_id ,
    instagram_access_token:instagram_access_token ,
    followers_count:InstagramPageDetails.followers_count ?? 0,
    biography:InstagramPageDetails.biography ?? "",
    follows_count:InstagramPageDetails.follows_count ?? 0,
    media_count:InstagramPageDetails.media_count ?? 0,
    name:InstagramPageDetails.name ?? "",
    profile_picture_url:InstagramPageDetails.profile_picture_url ?? "",
    username:InstagramPageDetails.username ??"",
    website:InstagramPageDetails.website ?? ""
   
  });

   return influencerInstagramInsertInfoQuery;

}

async function checkInfluencerConnection(influencer_id) {
  const isConnected = await tableNames.influencerInstagram.findOne({
    where: {
      influencer_id: influencer_id
    }
  });
  return isConnected !== null;
}
//////////////////////INSTAGRAM CONNECT API END//////////////////////////////
module.exports = {
  addInfluencerSocialMediaDetails,
  addInfluencerYoutubeChannel,
  addInfluencerFacebookDetails,
  addInfluencerInstagramDetails
};
