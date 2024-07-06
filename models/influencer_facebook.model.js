module.exports = (sequelize, DataTypes) => {
  const influencer_facebook = sequelize.define(
    "influencer_facebook",
    {
      influencer_facebook_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      influencer_id: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },

      fb_user_id: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      fb_access_token: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      connected_instagram_account: {
        type: DataTypes.STRING,
       
      },
      name: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      username: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      phone: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      followers_count: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      location: {
        type: DataTypes.STRING,
        defaultValue: null,
      },

      website: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      picture: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      cover: {
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
  return influencer_facebook;
};
