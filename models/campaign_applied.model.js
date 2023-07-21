module.exports = (sequelize, DataTypes) => {

    const campaign_applied = sequelize.define("campaign_applied", {
        campaign_applied_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        influencer_id: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        campaign_id: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        campaign_status_id: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
       
        delete_flag: {
            type: DataTypes.TINYINT,
            defaultValue: 0
        },
       
    },{
 createdAt: true,
 updatedAt: false
    })
    return campaign_applied
}