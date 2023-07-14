module.exports = (sequelize, DataTypes) => {

    const campaign_payment_type = sequelize.define("campaign_payment_type", {
        campaign_payment_type_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.INTEGER,
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
    return campaign_payment_type
}