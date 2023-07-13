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
    } /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
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
db.sequelize.sync({ force: false })
.then(() => {
   // console.log('yes re-sync done!')
})

module.exports = {db,sequelize}
