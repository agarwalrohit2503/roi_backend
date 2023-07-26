const { db, sequelize } = require("../utils/conn");

tableNames = {
  influencer: db.influencer,
  brands: db.brands,
  otp: db.otp,
  access_tokens: db.access_tokens,
  City: db.City,
  influencerAddress: db.influencer_address,
  State: db.state,
  influencerContentNiche: db.influencer_content_niche,
  contentNiche: db.content_niche,
  influencerPrice: db.influencer_price,
  campaignPaymentType: db.campaign_payment_type,
  Campaign: db.campaign,
  campaignContentNiche: db.campaignContentNiche,

  campaignApplication: db.campaign_application,

  //resource start
  Industry: db.industry,

  //resource end

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
  genToken: "access_tokens",
};

module.exports = Object.freeze(tableNames);
