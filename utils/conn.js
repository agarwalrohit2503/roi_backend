const dbConfig = require("../config/dbConfig");
const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = require("sequelize");
// const dbtest = require("./relationships");
const Op = Sequelize.Op;

const operatorsAliases = {
  $eq: Op.eq,
  $or: Op.or,
  $like: Op.like,
};

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions: {
    supportBigNumbers: true,
  } /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
  define: {
    timestamps: true,
    freezeTableName: true,
  },
  logging: false,
});
try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.influencer = require("../models/influencer_users.model")(
  sequelize,
  DataTypes
);
db.social_access_tokens = require("../models/social_access_token.model.js")(
  sequelize,
  DataTypes
);
db.influencer_youtube_list = require("../models/influencer_youtube_list.model.js")(
  sequelize,
  DataTypes
);
db.otp = require("../models/otp.model")(sequelize, DataTypes);
db.City = require("../models/city.model")(sequelize, DataTypes);
db.campaign_budget = require("../models/campaign_budget.model.js")(
  sequelize,
  DataTypes
);

db.influencer_type = require("../models/influencer_type.model.js")(
  sequelize,
  DataTypes
);

db.campaign_target_audience_gender =
  require("../models/campaign_target_adience_gender.model.js")(
    sequelize,
    DataTypes
  );

db.campaign_target_adience_age_group =
  require("../models/campaign_target_adience_age_group.model.js")(
    sequelize,
    DataTypes
  );

db.target_adience_age_group =
  require("../models/target_adience_age_group.model.js")(sequelize, DataTypes);

db.target_audience_gender =
  require("../models/target_audience_gender.model.js")(sequelize, DataTypes);

db.campaign_number_of_influencers =
  require("../models/campaign_number_of_influencers.model.js")(
    sequelize,
    DataTypes
  );

// db.City.belongsTo(db.influencer, { foreignKey: "id_city_influencer" });

db.state = require("../models/state.model")(sequelize, DataTypes);
db.influencer_price = require("../models/influencer_price.model")(
  sequelize,
  DataTypes
);
db.influencer_address = require("../models/influencer_address.model")(
  sequelize,
  DataTypes
);
db.campaign_application_content =
  require("../models/campaign_application_content.model.js")(
    sequelize,
    DataTypes
  );

db.influencer_file = require("../models/influencer_file.model")(
  sequelize,
  DataTypes
);
db.influencer_youtube = require("../models/influencer_youtube.model")(
  sequelize,
  DataTypes
);
db.influencer_facebook = require("../models/influencer_facebook.model.js")(
  sequelize,
  DataTypes
);
db.influencer_instagram = require("../models/influencer_instagram.model")(
  sequelize,
  DataTypes
);
db.favourite_influencer = require("../models/favourite_influencer.model")(
  sequelize,
  DataTypes
);
db.content_niche = require("../models/content_niche.model")(
  sequelize,
  DataTypes
);
db.influencer_content_niche =
  require("../models/influencer_content_niche.model")(sequelize, DataTypes);
db.industry = require("../models/industry.model")(sequelize, DataTypes);

db.brand_type = require("../models/brand_type.model")(sequelize, DataTypes);

db.brand_industry = require("../models/brand_industry.model")(
  sequelize,
  DataTypes
);
db.brands = require("../models/brands.model")(sequelize, DataTypes);
db.configuration = require("../models/configration.model")(
  sequelize,
  DataTypes
);
db.brands_file = require("../models/brand_file.model")(sequelize, DataTypes);

db.campaign_payment_type = require("../models/campaign_payment_type.model")(
  sequelize,
  DataTypes
);

db.campaign_status = require("../models/campaign_status.model")(
  sequelize,
  DataTypes
);

db.campaign_application = require("../models/campaign_application.model")(
  sequelize,
  DataTypes
);
db.campaign = require("../models/campaign.model")(sequelize, DataTypes);

db.favourite_influencer = require("../models/favourite_influencer.model")(
  sequelize,
  DataTypes
);

db.access_tokens = require("../models/access_tokens.model")(
  sequelize,
  DataTypes
);

db.campaignContentNiche = require("../models/campaign_content_niche.model")(
  sequelize,
  DataTypes
);

db.application_status = require("../models/application_status.model")(
  sequelize,
  DataTypes
);

db.influencer_profile_status =
  require("../models/influencer_profile_status.model")(sequelize, DataTypes);

db.campaign_goal = require("../models/campaign_goal.model")(
  sequelize,
  DataTypes
);
db.campaign_deliverables = require("../models/campaign_deliverables.model")(
  sequelize,
  DataTypes
);

db.campaign_platform = require("../models/campaign_platform.model")(
  sequelize,
  DataTypes
);
db.influencer_facebook_insights = require("../models/influencer_facebook_insights.model.js")(
  sequelize,
  DataTypes
);
db.platform = require("../models/platform.model")(sequelize, DataTypes);
db.Comments = require("../models/comments.model")(sequelize, DataTypes);
db.language = require("../models/language.model")(sequelize, DataTypes);

db.campaign_images = require("../models/campaign_images.model")(
  sequelize,
  DataTypes
);

db.influencer_language = require("../models/influencer_language.model")(
  sequelize,
  DataTypes
);

db.influencer_facebook_post =
  require("../models/influencer_facebook_post.model")(sequelize, DataTypes);

db.influencer_instagram_post =
  require("../models/influencer_instagram_post.model")(sequelize, DataTypes);

db.campaign_application_link =
  require("../models/campaign_application_link.model")(sequelize, DataTypes);

db.campaign_language = require("../models/campaign_language.model")(
  sequelize,
  DataTypes
);

db.campaign_platform.belongsTo(db.campaign, {
  foreignKey: "campaign_id", // foreign table
  targetKey: "campaign_id", // primary table
});

db.campaign_target_audience_gender.belongsTo(db.campaign, {
  foreignKey: "campaign_id", // foreign table
  targetKey: "campaign_id", // primary table
});

db.campaign_target_adience_age_group.belongsTo(db.campaign, {
  foreignKey: "campaign_id", // foreign table
  targetKey: "campaign_id", // primary table
});

db.campaign_target_audience_gender.belongsTo(db.target_audience_gender, {
  foreignKey: "target_audience_gender_id", // foreign table
  targetKey: "target_audience_gender_id", // primary table
});

db.campaign_target_adience_age_group.belongsTo(db.target_adience_age_group, {
  foreignKey: "target_adience_age_group_id", // foreign table
  targetKey: "target_adience_age_group_id", // primary table
});

db.campaign_number_of_influencers.belongsTo(db.campaign, {
  foreignKey: "campaign_id", // foreign table
  targetKey: "campaign_id", // primary table
});

db.campaign_deliverables.belongsTo(db.influencer_type, {
  foreignKey: "influencer_type_id", // foreign table
  targetKey: "influencer_type_id", // primary table
});

db.campaign_platform.belongsTo(db.platform, {
  foreignKey: "platform_id", // foreign table
  targetKey: "platform_id", // primary table
});

db.brands.belongsTo(db.City, {
  foreignKey: "city_id", // foreign table
  targetKey: "city_id", // primary table
});

db.City.belongsTo(db.state, {
  foreignKey: "state_id", // foreign table
  targetKey: "state_id", // primary table
});

db.brands.belongsTo(db.state, {
  foreignKey: "state_id", // foreign table
  targetKey: "state_id", // primary table
});

db.brands.belongsTo(db.brand_type, {
  foreignKey: "brand_type_id", // foreign table
  targetKey: "brand_type_id", // primary table
});

db.brand_industry.belongsTo(db.industry, {
  foreignKey: "industry_id", // foreign table
  targetKey: "industry_id", // primary table
});

db.brand_industry.belongsTo(db.brands, {
  foreignKey: "brand_id", // foreign table
  targetKey: "brands_id", // primary table
});

db.brands_file.belongsTo(db.brands, {
  foreignKey: "brand_id", // foreign table
  targetKey: "brands_id", // primary table
});

db.otp.belongsTo(db.brands, {
  foreignKey: "brand_id", // foreign table
  targetKey: "brands_id", // primary table
});

db.otp.belongsTo(db.influencer, {
  foreignKey: "influencer_id", // foreign table
  targetKey: "influencer_id", // primary table
});

db.favourite_influencer.belongsTo(db.brands, {
  foreignKey: "brand_id", // foreign table
  targetKey: "brands_id", // primary table
});

db.favourite_influencer.belongsTo(db.influencer, {
  foreignKey: "influencer_id", // foreign table
  targetKey: "influencer_id", // primary table
});

db.campaign.belongsTo(db.brands, {
  foreignKey: "brand_id", // foreign table
  targetKey: "brands_id", // primary table
});

db.campaign_deliverables.belongsTo(db.campaign, {
  foreignKey: "campaign_id", // foreign table
  targetKey: "campaign_id", // primary table
});

db.campaign_application.belongsTo(db.campaign, {
  foreignKey: "campaign_id", // foreign table
  targetKey: "campaign_id", // primary table
});

db.campaign_application.belongsTo(db.influencer, {
  foreignKey: "influencer_id", // foreign table
  targetKey: "influencer_id", // primary table
});

db.campaign_application.belongsTo(db.campaign_status, {
  foreignKey: "campaign_status_id", // foreign table
  targetKey: "campaign_status_id", // primary table
});

db.campaign_application.belongsTo(db.application_status, {
  foreignKey: "application_status_id", // foreign table
  targetKey: "application_status_id", // primary table
});

db.campaign.belongsTo(db.campaign_status, {
  foreignKey: "campaign_status_id", // foreign table
  targetKey: "campaign_status_id", // primary table
});

db.campaign.belongsTo(db.campaign_status, {
  foreignKey: "campaign_status_id", // foreign table
  targetKey: "campaign_status_id", // primary table
});

db.access_tokens.belongsTo(db.influencer, {
  foreignKey: "influencer_id", // foreign table
  targetKey: "influencer_id", // primary table
});
db.access_tokens.belongsTo(db.brands, {
  foreignKey: "brand_id", // foreign table
  targetKey: "brands_id", // primary table
});

db.influencer_address.belongsTo(db.influencer, {
  foreignKey: "influencer_id", // foreign table
  targetKey: "influencer_id", // primary table
});

db.influencer_address.belongsTo(db.City, {
  foreignKey: "city_id", // foreign table
  targetKey: "city_id", // primary table
});

db.influencer_address.belongsTo(db.state, {
  foreignKey: "state_id", // foreign table
  targetKey: "state_id", // primary table
});

db.influencer_content_niche.belongsTo(db.influencer, {
  foreignKey: "influencer_id", // foreign table
  targetKey: "influencer_id", // primary table
});

db.influencer_facebook.belongsTo(db.influencer, {
  foreignKey: "influencer_id", // foreign table
  targetKey: "influencer_id", // primary table
});
db.influencer_facebook_insights.belongsTo(db.influencer_facebook, {
  foreignKey: "influencer_id", // foreign table
  targetKey: "influencer_id", // primary table
});
// db.influencer_facebook_insights.belongsTo(db.influencer_facebook, {
//   foreignKey: "influencer_id", // foreign table
//   targetKey: "influencer_id", // primary table
// });

db.influencer_facebook_post.belongsTo(db.influencer_facebook, {
  foreignKey: "influencer_id", // foreign table
  targetKey: "influencer_id", // primary table
});

db.influencer_file.belongsTo(db.influencer, {
  foreignKey: "influencer_id", // foreign table
  targetKey: "influencer_id", // primary table
});

db.influencer_instagram.belongsTo(db.influencer, {
  foreignKey: "influencer_id", // foreign table
  targetKey: "influencer_id", // primary table
});

db.influencer_price.belongsTo(db.influencer, {
  foreignKey: "influencer_id", // foreign table
  targetKey: "influencer_id", // primary table
});

db.influencer_youtube.belongsTo(db.influencer, {
  foreignKey: "influencer_id", // foreign table
  targetKey: "influencer_id", // primary table
});

db.campaignContentNiche.belongsTo(db.content_niche, {
  foreignKey: "content_niche_id", // foreign table
  targetKey: "content_niche_id", // primary table
});

db.campaignContentNiche.belongsTo(db.campaign, {
  foreignKey: "campaign_id", // foreign table
  targetKey: "campaign_id", // primary table
});

db.City.belongsTo(db.state, {
  foreignKey: "state_id", // foreign table
  targetKey: "state_id", // primary table
});

db.campaign.belongsTo(db.campaign_payment_type, {
  foreignKey: "payment_status_id", // change column name
  targetKey: "campaign_payment_type_id", // change the referenced column
  uniqueKey: "campaign_type_fk", // foreign key constraint name
});
db.campaign.belongsTo(db.campaign_goal, {
  foreignKey: "campaign_goal_id", // foreign table
  targetKey: "campaign_goal_id", // primary table
});
db.campaign_application.belongsTo(db.campaign_status, {
  foreignKey: "campaign_status_id", // foreign table
  targetKey: "campaign_status_id", // primary table
});

db.influencer_content_niche.belongsTo(db.content_niche, {
  foreignKey: "content_niche_id", // foreign table
  targetKey: "content_niche_id", // primary table
});

db.influencer_profile_status.belongsTo(db.influencer, {
  foreignKey: "influencer_id", // foreign table
  targetKey: "influencer_id", // primary table
});

db.Comments.belongsTo(db.influencer, {
  foreignKey: "influencer_id", // foreign table
  targetKey: "influencer_id", // primary table
});

db.Comments.belongsTo(db.brands, {
  foreignKey: "brand_id", // foreign table
  targetKey: "brands_id", // primary table
});

db.Comments.belongsTo(db.campaign_application, {
  foreignKey: "campaign_applied_id", // foreign table
  targetKey: "campaign_applied_id", // primary table
});

db.campaign_language.belongsTo(db.language, {
  foreignKey: "language_id", // foreign table
  targetKey: "language_id", // primary table
});

db.campaign_language.belongsTo(db.campaign, {
  foreignKey: "campaign_id", // foreign table
  targetKey: "campaign_id", // primary table
});

db.influencer_language.belongsTo(db.language, {
  foreignKey: "language_id", // foreign table
  targetKey: "language_id", // primary table
});

db.influencer_language.belongsTo(db.influencer, {
  foreignKey: "influencer_id", // foreign table
  targetKey: "influencer_id", // primary table
});

db.campaign_images.belongsTo(db.campaign, {
  foreignKey: "campaign_id", // foreign table
  targetKey: "campaign_id", // primary table
});

db.influencer_facebook_post.belongsTo(db.influencer, {
  foreignKey: "influencer_id", // foreign table
  targetKey: "influencer_id", // primary table
});
db.influencer_instagram_post.belongsTo(db.influencer, {
  foreignKey: "influencer_id", // foreign table
  targetKey: "influencer_id", // primary table
});

db.influencer_instagram.belongsTo(db.influencer, {
  foreignKey: "influencer_id", // foreign table
  targetKey: "influencer_id", // primary table
});

db.campaign_application_content.belongsTo(db.campaign_application, {
  foreignKey: "campaign_applied_id", // foreign table
  targetKey: "campaign_applied_id", // primary table
});

db.campaign_application_link.belongsTo(db.campaign_application, {
  foreignKey: "campaign_applied_id", // foreign table
  targetKey: "campaign_applied_id", // primary table
});

db.social_access_tokens.belongsTo(db.influencer, {
  foreignKey: "influencer_id", // foreign table
  targetKey: "influencer_id", // primary table
});

db.influencer_youtube_list.belongsTo(db.influencer_youtube, {
  foreignKey: "influencer_youtube_id", // foreign table
  targetKey: "influencer_youtube_id", // primary table
});

// ///////////////////////////sync query start////////////////////////////
//  db.sequelize.sync({ force: false }).then(() => {
//   console.log("yes re-sync done!");
// }); 
// ///////////////////////////sync query  end/////////////////////////////

///////////////////////////table join query//////////////////////
db.influencer_youtube.hasMany(db.influencer_youtube_list, {
  foreignKey: "influencer_youtube_id",
});
db.influencer.hasMany(db.influencer_instagram, { 
  foreignKey: "influencer_id",
});

db.campaign.hasMany(db.campaign_target_adience_age_group, {
  foreignKey: "campaign_id",
});

db.campaign.hasMany(db.campaign_target_audience_gender, {
  foreignKey: "campaign_id",
});

db.campaign.hasMany(db.campaign_number_of_influencers, {
  foreignKey: "campaign_id",
});

db.influencer.hasMany(db.influencer_instagram_post, {
  foreignKey: "influencer_id",
});
db.influencer.hasMany(db.influencer_facebook_post, {
  foreignKey: "influencer_id",
});

db.influencer_facebook.hasMany(db.influencer_facebook_post, {
  foreignKey: "influencer_id",
});

db.influencer.hasMany(db.influencer_language, {
  foreignKey: "influencer_id",
});

db.Comments.hasMany(db.campaign_application, {
  foreignKey: "campaign_applied_id",
});

db.campaign.hasMany(db.campaign_images, {
  foreignKey: "campaign_id",
});

db.influencer_language.hasMany(db.language, {
  foreignKey: "language_id",
});

db.influencer.hasMany(db.influencer_address, {
  foreignKey: "influencer_id",
});

db.campaign.hasMany(db.campaign_application, {
  foreignKey: "campaign_id",
});

db.Comments.hasMany(db.influencer, {
  foreignKey: "influencer_id",
});
db.Comments.hasMany(db.brands, {
  foreignKey: "brands_id",
});
db.Comments.hasMany(db.campaign_application, {
  foreignKey: "campaign_applied_id",
});

db.campaign_application.hasMany(db.influencer, {
  foreignKey: "influencer_id",
});

db.campaign.hasMany(db.campaign_platform, {
  foreignKey: "campaign_id",
});

db.campaign_platform.hasMany(db.platform, {
  foreignKey: "platform_id",
});

db.influencer.hasMany(db.influencer_profile_status, {
  foreignKey: "influencer_id",
});
db.campaign.hasMany(db.campaign_deliverables, {
  foreignKey: "campaign_id",
});

db.influencer_address.hasMany(db.state, {
  foreignKey: "state_id",
});

db.influencer_address.hasMany(db.City, {
  foreignKey: "city_id",
});

db.influencer.hasMany(db.influencer_content_niche, {
  foreignKey: "influencer_id",
});

db.influencer_content_niche.hasMany(db.content_niche, {
  foreignKey: "content_niche_id",
});

db.influencer.hasMany(db.favourite_influencer, {
  foreignKey: "influencer_id",
});

db.brands.hasMany(db.campaign, {
  foreignKey: "brand_id",
  as: "brand_id",
});

db.campaign.hasMany(db.campaign_payment_type, {
  foreignKey: "campaign_payment_type_id",
});

db.campaign.hasMany(db.campaignContentNiche, {
  foreignKey: "campaign_id",
});

db.campaignContentNiche.hasMany(db.content_niche, {
  foreignKey: "content_niche_id",
});

//////////////////Campaign Languag Start//////////////////
db.campaign.hasMany(db.campaign_language, {
  foreignKey: "campaign_id",
});

db.campaign_language.hasMany(db.language, {
  foreignKey: "language_id",
});
//////////////////Campaign Languag end//////////////////

//////////////// BRANDS RELATION SECTION START /////////////////////////////////////

db.brands.hasMany(db.state, {
  foreignKey: "state_id",
});

db.brands.hasMany(db.City, {
  foreignKey: "city_id",
});

db.brands.hasMany(db.brand_industry, {
  foreignKey: "brand_id",
});

db.brand_industry.hasMany(db.industry, {
  foreignKey: "industry_id",
});

db.brands.hasMany(db.brand_type, {
  foreignKey: "brand_type_id",
});

//////////////// BRANDS RELATION SECTION END /////////////////////////////////////

//////////////APPLICATION CAMPAIGING RELATION SECTION START///////////////////////////

db.campaign_application.hasMany(db.campaign, {
  foreignKey: "campaign_id",
});

db.campaign.hasMany(db.brands, {
  foreignKey: "brands_id",
});

// db.campaign.hasMany(db.campaign_payment_type, {
//   foreignKey: "payment_status_id",
// });

db.campaign.hasMany(db.campaign_payment_type, {
  foreignKey: "campaign_payment_type_id",
});

db.campaign.hasMany(db.campaignContentNiche, {
  foreignKey: "campaign_id",
});

db.campaignContentNiche.hasMany(db.content_niche, {
  foreignKey: "content_niche_id",
});

db.campaign_application.hasMany(db.application_status, {
  foreignKey: "application_status_id",
});

db.campaign_application.hasMany(db.campaign_status, {
  foreignKey: "campaign_status_id",
});

db.campaign.hasMany(db.campaign_status, {
  foreignKey: "campaign_status_id",
});

db.campaign.hasMany(db.campaign_payment_type, {
  foreignKey: "campaign_payment_type_id",
});
//////////////APPLICATION CAMPAIGING RELATION SECTION END///////////////////////////

//////////////////////////brands influencer demo start//////////////////
db.influencer.hasOne(db.influencer_price, {
  foreignKey: "influencer_id",
  // as: "influencer_state",
});

db.favourite_influencer.hasMany(db.influencer, {
  foreignKey: "influencer_id",
});

db.influencer.hasMany(db.influencer_facebook, {
  foreignKey: "influencer_id",
});
// db.influencer.hasMany(db.influencer_facebook_insights, {
//   foreignKey: "influencer_id",
// });
db.influencer_facebook.hasMany(db.influencer_facebook_insights, {
  foreignKey: "influencer_id",
});

db.influencer.hasMany(db.influencer_youtube, {
  foreignKey: "influencer_id",
});

db.influencer.hasMany(db.influencer_instagram, {
  foreignKey: "influencer_id",
});

//////////////////////////brands influends demo end//////////////////

////////////////////social table link start ///////////////////////////
db.influencer.hasMany(db.social_access_tokens, {
  foreignKey: "influencer_id",
});

////////////////////social table link end ////////////////////////////
module.exports = { db, sequelize, operatorsAliases };
