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
        defaultValue: null,
        unique: true,
      },
      gender: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      number: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
      },
      dob: {
        type: DataTypes.DATE,
      },
      country: { type: DataTypes.STRING, defaultValue: null },
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
  // influencer.associate = (models) => {
  //   // associations can be defined here
  //   influencer.belongsTo(models.influencer_content_niche, {
  //     foreignKey: "influencer_id",
  //   });
  // };
  return influencer;
};
