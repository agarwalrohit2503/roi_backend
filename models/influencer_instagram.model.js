module.exports = (sequelize, DataTypes) => {
  const influencer_instagram = sequelize.define(
    "influencer_instagram",
    {
      influencer_instagram_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      influencer_id: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      instagram_user_id: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      instagram_access_token: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      followers_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      biography: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      follows_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      media_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      name: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      profile_picture_url: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      username: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      website: {
        type: DataTypes.STRING,
        defaultValue: null,
      },

      delete_flag: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
      },
    },
    {
      createdAt: true,
      updatedAt: false,
    }
  );
  return influencer_instagram;
};
