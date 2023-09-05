module.exports = (sequelize, DataTypes) => {
  const campaign_deliverables = sequelize.define(
    "campaign_deliverables",
    {
      campaign_deliverables_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      campaign_id: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      post: {
        type: DataTypes.BIGINT,
        defaultValue: 0,
      },
      story: {
        type: DataTypes.BIGINT,
        defaultValue: 0,
      },
      real: {
        type: DataTypes.BIGINT,
        defaultValue: 0,
      },
      youtube: {
        type: DataTypes.BIGINT,
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
  return campaign_deliverables;
};
