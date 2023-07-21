module.exports = (sequelize, DataTypes) => {

    const influencer_facebook = sequelize.define("influencer_facebook", {
        influencer_facebook_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        influencer_id: {
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
    return influencer_facebook
}