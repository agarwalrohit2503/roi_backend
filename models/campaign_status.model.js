module.exports = (sequelize, DataTypes) => {

    const campaign_status = sequelize.define("campaign_status", {
        campaign_status_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        campaign_status_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        delete_flag: {
            type: DataTypes.TINYINT,
            defaultValue: 0
        },
       
    },{
 createdAt: true,
 updatedAt: false
    })
    return campaign_status
}