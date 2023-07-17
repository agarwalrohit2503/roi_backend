const dbConfig = require('../config/dbConfig');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  dbConfig.DB, 
  dbConfig.USER,
  dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    dialectOptions: {
      supportBigNumbers: true
    }, /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
    define: {
      timestamps: true,
      freezeTableName: true
    },
  logging: true
});

try {
   sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const db = {}

//db.Sequelize = Sequelize
db.sequelize = sequelize

db.influencer_users = require('../models/influencer_users.model')(sequelize, DataTypes)
db.otp = require('../models/otp.model')(sequelize, DataTypes)
db.City = require('../models/city.model')(sequelize, DataTypes)
db.state = require('../models/state.model')(sequelize, DataTypes)
db.influencer_price = require('../models/influencer_price.model')(sequelize, DataTypes)
db.influencer_address = require('../models/influencer_address.model')(sequelize, DataTypes)
db.influencer_file = require('../models/influencer_file.model')(sequelize, DataTypes) 
db.influencer_youtube = require('../models/influencer_youtube.model')(sequelize, DataTypes)
db.influencer_facebook = require('../models/influencer_facebook.model.js')(sequelize, DataTypes)
db.influencer_instagram = require('../models/influencer_instagram.model')(sequelize, DataTypes)
db.favourite_influencer = require('../models/favourite_influencer.model')(sequelize, DataTypes)
db.content_niche = require('../models/content_niche.model')(sequelize, DataTypes)
db.influencer_content_niche = require('../models/influencer_content_niche.model')(sequelize, DataTypes)
db.industry = require('../models/industry.model')(sequelize, DataTypes)
db.brand_type = require('../models/brand_type.model')(sequelize, DataTypes)
db.brand_industry = require('../models/brand_industry.model')(sequelize, DataTypes)
db.brands = require('../models/brands.model')(sequelize, DataTypes)
db.configuration = require('../models/configration.model')(sequelize, DataTypes)
db.brands_file = require('../models/brand_file.model')(sequelize, DataTypes) 
db.campaign_payment_type = require('../models/campaign_payment_type.model')(sequelize, DataTypes) 
db.campaign_status = require('../models/campaign_status.model')(sequelize, DataTypes)
db.campaign_applied = require('../models/campaign_applied.model')(sequelize, DataTypes)
db.campaign = require('../models/campaign.model')(sequelize, DataTypes)
db.favourite_influencer = require('../models/favourite_influencer.model')(sequelize, DataTypes)
db.gen_token = require('../models/gen_token.model')(sequelize, DataTypes)
db.sequelize.sync({ force: false })
.then(() => {
   // console.log('yes re-sync done!')
})

module.exports = {db,sequelize}
