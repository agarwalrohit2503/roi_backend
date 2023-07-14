const {db, sequelize} = require('../utils/conn');

tableNames = {

influencer_users : db.influencer_users,



//row sql tables names
 otps : 'otp',
 influencer_user:'influencer_user',
 influencer_price:'influencer_price',
influencer_address:'influencer_address',
influencer_file:'influencer_file',
influencer_facebook:'influencer_facebook',
influencer_instagram:'influencer_instagram',
influencer_youtube:'influencer_youtube',
influencer_content_niche:'influencer_content_niche',
content_niche:'content_niche',
state:'state',
city:'city'
}

module.exports =  Object.freeze(tableNames)