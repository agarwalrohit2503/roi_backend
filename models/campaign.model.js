module.exports = (sequelize, DataTypes) => {

    const campaign = sequelize.define("campaign", {
        campaign_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        brand_id: {
            type: DataTypes.INTEGER,
            defaultValue: '0'
        },
        campaign_status_id: {
            type: DataTypes.INTEGER,
            defaultValue: '0'
        },
        campaign_name: {
            type: DataTypes.TEXT,
          //  defaultValue: '0'
        },
        campaign_about: {
            type: DataTypes.TEXT,
          //  defaultValue: '0'
        },
        language: {
            type: DataTypes.TEXT,
          //  defaultValue: '0'
        },
        campaign_start_dt: {
            type: DataTypes.DATE,
          //  defaultValue: '0'
        },
        campaign_end_dt: {
            type: DataTypes.DATE,
          //  defaultValue: '0'
        },
        payment_type: {
            type: DataTypes.INTEGER,
            defaultValue: '0'
        },
        campaign_budget: {
            type: DataTypes.FLOAT,
            defaultValue: '0'
        },
        file: {
            type: DataTypes.TEXT,
            defaultValue: '0'
        },
        campaign_delete: {
            type: DataTypes.INTEGER,
            defaultValue: '0'
        },
       
    },{
 createdAt: true,
 updatedAt: false
    })
    return campaign
}