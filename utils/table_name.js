const { db, sequelize } = require("../utils/conn");

tableNames = {

  influencer: db.influencer,

  campaignBudget: db.campaign_budget,

  targetAudienceGender: db.target_audience_gender,

  targetAdienceAgeGroup: db.target_adience_age_group,

  campaignNumberOfInfluencers: db.campaign_number_of_influencers,

  influencerType:db.influencer_type,

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

  brandIndustry: db.brand_industry,

  brandType: db.brand_type,

  applicationStatus: db.application_status,

  campaignStatus: db.campaign_status,

  campaignPaymentType: db.campaign_payment_type,

  favouriteInfluencer: db.favourite_influencer,

  influencerFacebook: db.influencer_facebook,
  influencerFacebookInsights: db.influencer_facebook_insights,

  influencerFacebookPost: db.influencer_facebook_post,

  influencerInstagram: db.influencer_instagram,

  influencerInstagramPost: db.influencer_instagram_post,

  influencerYoutube: db.influencer_youtube,
  influencerYoutubeList: db.influencer_youtube_list,

  campaignContentNiche: db.campaignContentNiche,
  influencerProfileStatus: db.influencer_profile_status,

  Platform: db.platform,

  campaignGoal: db.campaign_goal,

  campaignDeliverables: db.campaign_deliverables,

  campaignPlatform: db.campaign_platform,

  Comments: db.Comments,

  language: db.language,
  campaignLanguage: db.campaign_language,

  influencerLanguage: db.influencer_language,

  campaignImages: db.campaign_images,
  campaignApplicationContent: db.campaign_application_content,
  campaignApplicationLink: db.campaign_application_link,

  campaignTargetAudienceGender: db.campaign_target_audience_gender,

  campaignTargetAdienceAgeGroup: db.campaign_target_adience_age_group,

  socialAcessToken:db.social_access_tokens,

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
