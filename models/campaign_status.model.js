module.exports = (sequelize, DataTypes) => {

    const campaign_status = sequelize.define("campaign_status", {
        campaign_status_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        campaign_status_name: {
            type: DataTypes.TEXT,
          //  defaultValue: '0'
        },
        delete_flag: {
            type: DataTypes.INTEGER,
            defaultValue: '0'
        },
       
    },{
 createdAt: true,
 updatedAt: false
    })
    return campaign_status
}