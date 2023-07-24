module.exports = (sequelize, DataTypes) => {
  const influencer_content_niche = sequelize.define(
    "influencer_content_niche",
    {
      influencer_content_niche_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      influencer_id: {
        type: DataTypes.INTEGER,
        defaultValue: null
      },
      content_niche_id: {
        type: DataTypes.INTEGER,
        defaultValue: null
      },

      // delete_flag: {
      //   type: DataTypes.TINYINT,
      //   defaultValue: 0,
      // },
    },
    {
      createdAt: true,
      updatedAt: false,
    }
  );
  return influencer_content_niche;
};
