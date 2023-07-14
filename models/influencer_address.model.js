module.exports = (sequelize, DataTypes) => {

    const influencer_address = sequelize.define("influencer_address", {
        influencer_address_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        influencer_id: {
            type: DataTypes.INTEGER,
          //  defaultValue: '0'
        },
        address: {
            type: DataTypes.TEXT,
          //  defaultValue: '0'
        },
        country: {
            type: DataTypes.TEXT,
          //  defaultValue: '0'
        },
        city: {
            type: DataTypes.INTEGER,
           // defaultValue: '0'
        },
        state: {
            type: DataTypes.INTEGER,
          //  defaultValue: '0'
        },
        pin: {
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
    return influencer_address
}