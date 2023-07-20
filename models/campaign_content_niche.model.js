module.exports = (sequelize, DataTypes) => {

    const campaignContentNiche = sequelize.define("campaign_content_niche", {
        campaign_content_niche_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        campaign_id: {
            type: DataTypes.INTEGER,
            defaultValue: '0'
        },
        content_niche_id: {
            type: DataTypes.INTEGER,
            defaultValue: '0'
        },
        delete_flag: {
            type: DataTypes.INTEGER,
            defaultValue: '0'
        },
       
    },{
 createdAt: true,
 updatedAt: false
    })
    return campaignContentNiche
}