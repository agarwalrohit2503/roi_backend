module.exports = (sequelize, DataTypes) => {

    const influencer_youtube = sequelize.define("influencer_youtube", {
        influencer_youtube_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        influencer_id: {
            type: DataTypes.INTEGER,
            defaultValue: null
        },
       
        delete_flag: {
            type: DataTypes.TINYINT,
            defaultValue: 0
        },
       
    },{
 createdAt: true,
 updatedAt: false
    })
    return influencer_youtube
}