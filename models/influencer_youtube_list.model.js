module.exports = (sequelize, DataTypes) => {

    const influencer_youtube_list = sequelize.define("influencer_youtube_list", {
        influencer_youtube_list_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        influencer_youtube_id: {
            type: DataTypes.INTEGER,
            defaultValue: null
        },

        publishedAt: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        channelId: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        title: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        description: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        thumbnails: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
       
        delete_flag: {
            type: DataTypes.TINYINT,
            defaultValue: 0
        },
       
    },{
 createdAt: true,
 updatedAt: false
    })
    return influencer_youtube_list
}