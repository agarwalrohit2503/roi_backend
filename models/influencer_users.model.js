module.exports = (sequelize, DataTypes) => {
  const influencer_users = sequelize.define(
    "influencer",
    {
      influencer_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      city_id: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      state_id: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
      },
      number: {
        type: DataTypes.BIGINT,
        allowNull: false,
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

  return influencer_users;
};
