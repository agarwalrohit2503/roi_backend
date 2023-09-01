const dbConfig = require("../config/dbConfig");
const { Sequelize, DataTypes } = require("sequelize");
//const sequelize = require("sequelize");
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
  logging: true,
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
db.otp = require("../models/otp.model")(sequelize, DataTypes);
db.City = require("../models/city.model")(sequelize, DataTypes);

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
// db.favourite_influencer = require("../models/favourite_influencer.model")(
//   sequelize,
//   DataTypes
// );
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
db.platform = require("../models/platform.model")(sequelize, DataTypes);

db.campaign_platform.belongsTo(db.campaign, {
  foreignKey: "campaign_id", // foreign table
  targetKey: "campaign_id", // primary table
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

db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done!");
});
///////////////////////////table join query//////////////////////

db.influencer.hasMany(db.influencer_address, {
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
db.influencer.hasMany(db.influencer_price, {
  foreignKey: "influencer_id",
  // as: "influencer_state",
});

db.favourite_influencer.hasMany(db.influencer, {
  foreignKey: "influencer_id",
});

db.influencer.hasMany(db.influencer_facebook, {
  foreignKey: "influencer_id",
});

db.influencer.hasMany(db.influencer_youtube, {
  foreignKey: "influencer_id",
});

db.influencer.hasMany(db.influencer_instagram, {
  foreignKey: "influencer_id",
});

//////////////////////////brands influends demo end//////////////////
module.exports = { db, sequelize, operatorsAliases };
