module.exports = (sequelize, DataTypes) => {
  const campaign_target_adience_age_group = sequelize.define(
    "campaign_target_adience_age_group",
    {
      campaign_target_adience_age_group_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    
      campaign_id: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      target_adience_age_group_id : {
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
  return campaign_target_adience_age_group;
};
