module.exports = (sequelize, DataTypes) => {
  const influencer_address = sequelize.define(
    "influencer_address",
    {
      influencer_address_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      influencer_id: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city_id: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      state_id: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      pin: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      primary_address: {
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
  return influencer_address;
};
