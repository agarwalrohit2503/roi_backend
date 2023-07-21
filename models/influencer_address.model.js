module.exports = (sequelize, DataTypes) => {

    const influencer_address = sequelize.define("influencer_address", {
        influencer_address_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        influencer_id: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        address: {
            type: DataTypes.STRING,
            defaultValue: 0
        },
        country: {
            type: DataTypes.STRING,
            defaultValue: 0
        },
        city_id: {
            type: DataTypes.INTEGER,
           defaultValue: 0
        },
        state_id: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        pin: {
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
    return influencer_address
}