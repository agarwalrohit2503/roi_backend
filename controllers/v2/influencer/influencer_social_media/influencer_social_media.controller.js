const tableNames = require("../../../../utils/table_name");
const operatorsAliases = require("../../../../utils/operator_aliases");
const https = require('https');
const path = require("path");
const dotenv = require("dotenv").config({
  path: path.resolve(process.cwd(), ".env"),
});
const { success, error,error_simple } = require("../../../../utils/responseApi");
// const fbTokenAccess = require("../../../../utils/fb_secret_keys");
const Facebook = require("facebook-js-sdk");
const { param } = require("../../../../routes/v2/influencers/influencer_social_media");
const { where } = require("sequelize");

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

  // console.log(google_token);
  // console.log(channel_id);

  try {
    const influencer = await findInfluencer(influencer_id);
    if (!influencer) {
      return error(res, "Influencer not found",);
    }

    const isInfluencerConnected = await checkInfluencerConnection(influencer_id);
    console.log(isInfluencerConnected);

    var isInfluenserAlreadyConnected = await tableNames.influencerYoutube.findOne({
      where: {
        influencer_id: influencer_id
      }
    });

    if (isInfluenserAlreadyConnected != null) {
      return error(res, "Influencer Account Already Connected",);
    } else {
      // //FEATCH CHANNEL DETAILS
      const youtubeData = await fetchYoutubeChannelDetails(google_token);
      if (!youtubeData) {
        return error_simple(res, "Failed to fetch YouTube data",209);
      }
     

      //FETCH CHANNEL VIDEO LIST
      const youtubeVideoList = await fetchYoutubeChannelVideoList(google_token);
      //console.log(youtubeVideoList[0].snippet.channelId);
      if (!youtubeVideoList) {
        return error_simple(res, "Failed to fetch YouTube channel list video",209);
      }
      

      //FETCH CHANNEL ANALYTICS LIST
      const youtubeChannelAnalyticsList = await fetchYoutubeChannelAnalyticsList(google_token, youtubeVideoList[0]?.snippet?.channelId);
      console.log(youtubeChannelAnalyticsList);
      if (!youtubeChannelAnalyticsList) {
        return error_simple(res, "Failed to fetch YouTube channel Analytics list",209);
      }
     


      const youtubeAnalyticsList = await analyticsDataMerge(youtubeChannelAnalyticsList);
      // console.log(youtubeAnalyticsList);



      const savedInfluencerData = await saveInfluencerYoutubeData(influencer_id, youtubeData, youtubeVideoList, youtubeAnalyticsList);
      if (!savedInfluencerData) {
        return error(res, "Failed to save influencer data",);
      }

      success(res, "Influencer YouTube details inserted", "Influencer YouTube details not inserted, please try again", savedInfluencerData, 1);
   }


  } catch (err) {

    return error(res, "Internal Server Error 1",);
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

function fetchYoutubeChannelDetails(google_token,res) {
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
        //  console.log(jsonResponse?.items);
        //  if(jsonResponse.error.code == 401){
         //   return resolve(false);
            // error(res, "Request had invalid authentication credentials. Expected OAuth 2 access token, login cookie or other valid authentication credential.",409);
         // }else{
            return   resolve(jsonResponse?.items[0]);
         // }
         
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

function fetchYoutubeChannelAnalyticsList(google_token, channel_id) {
  console.log(channel_id);
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'youtubeanalytics.googleapis.com',
      port: 443,
      path: `/v2/reports?endDate=2024-05-17&ids=channel%3D%3D${channel_id}&metrics=likes%2Cdislikes%2Ccomments%2Cshares%2Cviews%2CaverageViewDuration%2CestimatedMinutesWatched&startDate=2020-05-17`,
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
          //console.log(jsonResponse);
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

async function saveInfluencerYoutubeData(influencer_id, data, youtubeVideoList, youtubeAnalyticsList) {

  console.log(youtubeAnalyticsList[0]);

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
    channel_cover_url: data?.brandingSettings?.image?.bannerExternalUrl ?? "",
    likes: youtubeAnalyticsList[0]?.likes ?? 0,
    dislikes: youtubeAnalyticsList[0]?.dislikes ?? 0,
    comments: youtubeAnalyticsList[0]?.comments ?? 0,
    shares: youtubeAnalyticsList[0]?.shares ?? 0,
    views: youtubeAnalyticsList[0]?.views ?? 0,
    averageViewDuration: youtubeAnalyticsList[0]?.averageViewDuration ?? 0,
    estimatedMinutesWatched: youtubeAnalyticsList[0]?.estimatedMinutesWatched ?? 0
  });


  let campaignContentNicheRespData = await Promise.all(
    youtubeVideoList.map(async (item) => {


      return await tableNames.influencerYoutubeList.create({
        influencer_youtube_id: influencerYoutubeChannelInfoQuery.influencer_youtube_id,
        publishedAt: item.snippet.publishedAt,
        channelId: item.snippet.channelId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnails: item.snippet.thumbnails.high.url,
      }); // Add the required fields
    }
    ));

  return campaignContentNicheRespData;

}

async function analyticsDataMerge(youtubeChannelAnalyticsList) {
  const columnHeaders = youtubeChannelAnalyticsList.columnHeaders.map(header => header.name);

  // Extract rows
  const rows = youtubeChannelAnalyticsList.rows;

  // Combine headers and rows into a list of objects
  const combinedData = rows.map(row => {
    const dataObj = {};
    columnHeaders.forEach((header, index) => {
      dataObj[header] = row[index];
    });
    return dataObj;
  });

  return combinedData;
}
//////////////////////YOUTUBE API END////////////////////////////////

//////////////////////FACEBOOK CONNECT API START//////////////////////////////
async function addInfluencerFacebookDetails(req, res) {
  
  const { influencer_id } = req.params;
  const {fb_access_token } = req.body;

 // try {
    const influencer = await findInfluencer(influencer_id);
    if (!influencer) {
      return error(res, "Influencer not found",);
    }

    const facebookDetails = await fetchFacebookPageTokenDetails(fb_access_token);
    if (!facebookDetails) {
      return error(res, "Failed to fetch facebook data",);
    }


  //  console.log(facebookDetails['data'][1]['id']);
  //  console.log(facebookDetails['data'][1]['access_token']);

     console.log(facebookDetails);
    // console.log(facebookDetails['data'][0]['access_token']);
    // console.log(facebookDetails['data'][0]['id']);


    const facebookPageDetails = await fetchFacebookDetails(facebookDetails['data'][1]['id'], facebookDetails['data'][1]['access_token']);
    if (!facebookPageDetails) {
      return error(res, "Failed to fetch facebook data",);
    }
   // console.log(facebookPageDetails['posts']['data']);

    var isInfluencerConnected = await tableNames.influencerFacebook.findOne({
      where: {
        influencer_id: influencer_id
      }
    });
    if (isInfluencerConnected != null) {
      return error(res, "Influencer Facebook Account Already Connected",);
    } else {
     
     console.log(facebookPageDetails.connected_instagram_account);

      const savedInfluencerData = await saveInfluencerFacebookData(influencer_id, facebookPageDetails, facebookDetails['data'][1]['id'], facebookDetails['data'][1]['access_token']);
      if (!savedInfluencerData) {
        return error(res, "Failed to save influencer data",);
      }
      var isUploaded = await facebookPostList(facebookPageDetails['posts']['data'], influencer_id);
      console.log(isUploaded);

    success(res, "Influencer Facebbok details inserted", "Influencer Facebook details not inserted, please try again", savedInfluencerData, 1);


}


  // } catch (err) {
  //   return error(res, "Internal Server Error",);
  // }
}

function fetchFacebookPageTokenDetails(fb_access_token) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'graph.facebook.com',
      port: 443,
      path: `https://graph.facebook.com/v20.0/me/accounts?access_token=${fb_access_token}`,
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

function fetchFacebookDetails(fb_user_id, fb_access_token) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'graph.facebook.com',
      port: 443,
      path: `/v20.0/${fb_user_id}?fields=phone%2Cfollowers_count%2Clocation%2Cname%2Cpage_token%2Cusername%2Cwebsite%2Cinstagram_business_account%2Cemails%2Cposts{full_picture}%2Cpicture%2Ccover%2Cfeed%2Cconnected_instagram_account&access_token=${fb_access_token}`,
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
async function facebookPostList(posts,influencer_id){

  return await Promise.all(
    posts.map(async (item) => {
      console.log(item);
      try {
        let fbPost = {
          influencer_id:influencer_id,
          link: item.full_picture,
          facebook_post_id: item.id,
        };
         insertContentNicheQuery =
          await tableNames.influencerFacebookPost.create(fbPost);

        return insertContentNicheQuery;
      } catch (error) {
        return { ...item, error };
      }
    })
  );

}
async function saveInfluencerFacebookData(influencer_id, facebookPageDetails, fb_user_id, fb_access_token) {

  const influencerFacebookInsertInfoQuery = await tableNames.influencerFacebook.create({
    influencer_id: influencer_id,
    fb_user_id: fb_user_id,
    fb_access_token: fb_access_token,
    connected_instagram_account:facebookPageDetails.connected_instagram_account.id ??"",
    name: facebookPageDetails.name ?? "",
    username: facebookPageDetails.username ?? "",
    phone: facebookPageDetails.phone ?? "",
    followers_count: facebookPageDetails.followers_count ?? "",
    location: facebookPageDetails.location.street ?? "",
    website: facebookPageDetails.website ?? "",
    picture: facebookPageDetails.picture.data.url ?? "",
    cover: facebookPageDetails.cover.source ?? ""
  });

  return influencerFacebookInsertInfoQuery;

}

//////////////////////FACEBOOK CONNECT API END//////////////////////////////

//////////////////////INSTAGRAM CONNECT API START//////////////////////////////
async function addInfluencerInstagramDetails(req, res) {
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

    const savedInfluencerInstaData = await saveInfluencerInstagramData(influencer_id, instagramPageDetails, instagram_user_id, instagram_access_token);
    if (!savedInfluencerInstaData) {
      return error(res, "Failed to save influencer data",);
    }

    success(res, "Influencer Instagram details inserted", "Influencer Instagram details not inserted, please try again", savedInfluencerInstaData, 1);

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
    instagram_user_id: instagram_user_id,
    instagram_access_token: instagram_access_token,
    followers_count: InstagramPageDetails.followers_count ?? 0,
    biography: InstagramPageDetails.biography ?? "",
    follows_count: InstagramPageDetails.follows_count ?? 0,
    media_count: InstagramPageDetails.media_count ?? 0,
    name: InstagramPageDetails.name ?? "",
    profile_picture_url: InstagramPageDetails.profile_picture_url ?? "",
    username: InstagramPageDetails.username ?? "",
    website: InstagramPageDetails.website ?? ""

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











//////////////////////////////GET Social MEDIA ACCOUNT////////////////

async function getInfluencerYoutubeChannel(req, res) {
  const { influencer_id } = req.params;

  const influencer = await findInfluencer(influencer_id);
    if (!influencer) {
      return error(res, "Influencer not found",);
    }

  var findInfluencerYoutube = await tableNames.influencerYoutube.findOne({
    
    include:[{
      model:tableNames.influencerYoutubeList,
      required:false,
    }],
    where: {
      influencer_id: influencer_id
    }
  });

  success(res, "Influencer Youtube details ", "Influencer Youtube details not found", findInfluencerYoutube, 0);

}

async function getInfluencerFacebookAccount(req, res) {
  const { influencer_id } = req.params;

  const influencer = await findInfluencer(influencer_id);
    if (!influencer) {
      return error(res, "Influencer not found",);
    }

  var findInfluencerFacebook = await tableNames.influencerFacebook.findOne({
    where:{
      influencer_id: influencer_id
    }
  });

  success(res, "Influencer Facebook details ", "Influencer Facebook details not found", findInfluencerFacebook, 0);
  
}

async function getInfluencerFacebookAccountPost(req, res) {
  const { influencer_id } = req.params;

  const influencer = await findInfluencer(influencer_id);
    if (!influencer) {
      return error(res, "Influencer not found",);
    }

  var findInfluencerFacebook = await tableNames.influencerFacebookPost.findAll({
   
    where:{
      influencer_id: influencer_id
    }
  });
  success(res, "Influencer Facebook details ", "Influencer Facebook details not found", findInfluencerFacebook, 0);
}

async function getInfluencerInstagramAccount(req, res) {
  const { influencer_id } = req.params;

  const influencer = await findInfluencer(influencer_id);
    if (!influencer) {
      return error(res, "Influencer not found",);
    }

  var findInfluencerInstagram = await tableNames.influencerInstagram.findOne({
    where: {
      influencer_id: influencer_id
    }
  });

  success(res, "Influencer Instagram details ", "Influencer Instagram details not found", findInfluencerInstagram, 0);

}
module.exports = {
  addInfluencerSocialMediaDetails,
  addInfluencerYoutubeChannel,
  addInfluencerFacebookDetails,
  addInfluencerInstagramDetails,
  getInfluencerYoutubeChannel,
  getInfluencerFacebookAccount,
  getInfluencerInstagramAccount,
  getInfluencerFacebookAccountPost
};
