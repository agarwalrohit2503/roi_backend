module.exports = (sequelize, DataTypes) => {
  const influencer = sequelize.define(
    "influencer",
    {
      influencer_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      city_id: {
        type: DataTypes.INTEGER,
        defaultValue: null
      },
      state_id: {
        type: DataTypes.INTEGER,
        defaultValue: null
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      number: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
      },
      dob: {
        type: DataTypes.DATE,
      },
      country: { type: DataTypes.STRING },
      pan_card: { type: DataTypes.STRING },
      gst_number: { type: DataTypes.STRING },
      bio: { type: DataTypes.TEXT },
      account_delete: { type: DataTypes.TINYINT, defaultValue: 0 },
      profile_status: { type: DataTypes.TINYINT, defaultValue: 0 },
    },
    {
      createdAt: true,
      updatedAt: false,
    }
  );

  return influencer;
};
