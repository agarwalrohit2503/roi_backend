module.exports = (sequelize, DataTypes) => {
  const influencer_facebook_post = sequelize.define(
    "influencer_facebook_post",
    {
      influencer_facebook_post_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      influencer_id: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },

      facebook_post_id: {
        type: DataTypes.BIGINT,
        defaultValue: null,
      },
      link: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      facebook_post_created_time: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
    },
    {
      createdAt: true,
      updatedAt: false,
    }
  );
  return influencer_facebook_post;
};
