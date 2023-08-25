module.exports = (sequelize, DataTypes) => {
  const favourite_influencer = sequelize.define(
    "favourite_influencer",
    {
      favourite_influencer_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      influencer_id: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      brand_id: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      favourite_influencer_flag: {
        type: DataTypes.TINYINT,
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
  return favourite_influencer;
};
