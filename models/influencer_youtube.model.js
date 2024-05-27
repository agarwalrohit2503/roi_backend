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

        channel_name: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        description: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        channel_custom_url: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        publishedAt: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        channel_logo: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        country: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        channel_cover_url: {
            type: DataTypes.STRING,
            defaultValue: null,
        },

        total_view_count: {
            type: DataTypes.BIGINT,
        },
        total_subscriber_count: {
            type: DataTypes.BIGINT,
        },
        total_video_count: {
            type: DataTypes.BIGINT,
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