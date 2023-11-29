module.exports = (sequelize, DataTypes) => {
  const campaign_target_audience_gender = sequelize.define(
    "campaign_target_audience_gender",
    {
      campaign_target_audience_gender_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      campaign_id: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      target_audience_gender_id: {
        type: DataTypes.INTEGER,
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
  return campaign_target_audience_gender;
};
