module.exports = (sequelize, DataTypes) => {
  const influencer_price = sequelize.define(
    "influencer_price",
    {
      influencer_price_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      influencer_id: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      post_cost: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      reels_cost: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      video_cost: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      story_cost: {
        type: DataTypes.FLOAT,
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
  return influencer_price;
};
