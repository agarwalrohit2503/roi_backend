module.exports = (sequelize, DataTypes) => {
  const influencer = sequelize.define(
    "influencer",
    {
      influencer_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      email: {
        type: DataTypes.STRING,
       // defaultValue: null,
      //  unique: true,
      },
      gender: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      number: {
       type: DataTypes.BIGINT,
       // allowNull: false,
     // unique: true,
      },
      dob: {
        type: DataTypes.DATE,
      },

      pan_card: { type: DataTypes.STRING, defaultValue: null },
      gst_number: { type: DataTypes.STRING, defaultValue: null },
      bio: { type: DataTypes.TEXT, defaultValue: null },
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
