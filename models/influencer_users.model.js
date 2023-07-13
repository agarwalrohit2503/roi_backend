module.exports = (sequelize, DataTypes) => {

    const influencer_users = sequelize.define("influencer_user", {
        influencer_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        secret_key: {
            type: DataTypes.INTEGER,
            defaultValue: '0'
        },
        city_id: {
            type: DataTypes.INTEGER,
            defaultValue: '0'
        },
        state_id:{
            type: DataTypes.INTEGER,
            defaultValue: '0'
        },
        // category_id:{
        //     type: DataTypes.INTEGER,
        //     defaultValue: '0'
        // },     
        name: {
            type: DataTypes.TEXT,
           // allowNull: false
          },
        email: {
            type: DataTypes.TEXT,
           // allowNull: false
          },
        gender: {
            type: DataTypes.TEXT,
           // allowNull: false
          },
       
        number: {
            type: DataTypes.INTEGER
            // allowNull defaults to true
        },
        dob: {
            type: DataTypes.TEXT
            // allowNull defaults to true
        },
        country: { type: DataTypes.TEXT },
        // address: { type: DataTypes.TEXT },
        pan_card:{ type: DataTypes.INTEGER},
        gst_number:{ type: DataTypes.INTEGER},
        bio: {type: DataTypes.TEXT ,},
 
        account_delete: { type: DataTypes.INTEGER, defaultValue: '0' },
        profile_status: { type: DataTypes.INTEGER, defaultValue: '0' },
    },{
 // I don't want createdAt
 createdAt: true,

 // I want updatedAt to actually be called updateTimestamp
 updatedAt: false
    })
    return influencer_users
}