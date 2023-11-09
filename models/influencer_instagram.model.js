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
      insta_user_id: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      name: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      birthday: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      age_range: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      profile_link: {
        type: DataTypes.STRING,
        defaultValue: null,
      },

      gender: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      location: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      total_follower: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
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
