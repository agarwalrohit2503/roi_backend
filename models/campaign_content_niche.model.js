const tableNames = require("../utils/table_name");

module.exports = (sequelize, DataTypes) => {

    const campaignContentNiche = sequelize.define("campaign_content_niche", {
        campaign_content_niche_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        campaign_id: {
            type: DataTypes.INTEGER,
            defaultValue: null
        },
        content_niche_id: {
            type: DataTypes.INTEGER,
            defaultValue: null
        },
        delete_flag: {
            type: DataTypes.TINYINT,
            defaultValue: 0
        },
       
    },{
 createdAt: true,
 updatedAt: false
    })
    return campaignContentNiche
}