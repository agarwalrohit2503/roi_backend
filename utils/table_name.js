const { db, sequelize } = require("../utils/conn");

tableNames = {
  influencer: db.influencer,
  brands: db.brands,
  otp: db.otp,
  gen_token: db.gen_token,
  City: db.City,
  influencerAddress: db.influencer_address,
  State: db.state,
  influencerContentNiche: db.influencer_content_niche,
  contentNiche:db.content_niche,
  //row sql tables names
  // otps: "otp",
  Influencer: "influencer",
  influencer_price: "influencer_price",
  influencer_address: "influencer_address",
  influencer_file: "influencer_file",
  influencer_facebook: "influencer_facebook",
  influencer_instagram: "influencer_instagram",
  influencer_youtube: "influencer_youtube",
  influencer_content_niche: "influencer_content_niche",
  content_niche: "content_niche",
  state: "state",
  city: "city",
  campaign: "campaign",
  campaign_status: "campaign_status",
  campaign_application_status: "campaign_application_status", //!create model
  campaign_application: "campaign_applications",
  campaign_content_niche: "campaign_content_niche",
  brand: "brand",
  brand_type: "brand_type",
  brand_industry: "brand_industry",
  industry: "industry",
  brands_file: "brands_file",
  favourite_influencer: "favourite_influencer",
  genToken: "gen_token",
};

module.exports = Object.freeze(tableNames);
