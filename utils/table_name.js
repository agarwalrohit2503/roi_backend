const {db, sequelize} = require('../utils/conn');

tableNames = {

    influencer_users : db.influencer_users,
//row sql tables names
//influencer_users : 'influencer_users'
}

module.exports =  Object.freeze(tableNames)