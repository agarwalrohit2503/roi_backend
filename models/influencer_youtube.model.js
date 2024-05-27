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
        ///
        likes: {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        dislikes: {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        comments: {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        shares: {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        views: {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        averageViewDuration: {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        estimatedMinutesWatched: {
            type: DataTypes.BIGINT,
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
    return influencer_youtube
}