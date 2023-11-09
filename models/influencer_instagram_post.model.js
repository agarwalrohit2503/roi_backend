module.exports = (sequelize, DataTypes) => {
  const influencer_instagram_post = sequelize.define(
    "influencer_instagram_post",
    {
      influencer_instagram_post_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      influencer_id: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },

      instagram_post_id: {
        type: DataTypes.BIGINT,
        defaultValue: null,
      },
      link: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      instagram_post_created_time: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
    },
    {
      createdAt: true,
      updatedAt: false,
    }
  );
  return influencer_instagram_post;
};
