const tableNames = require("../utils/table_name");

module.exports = (sequelize, DataTypes) => {
  const campaign_application = sequelize.define(
    "campaign_application",
    {
      campaign_applied_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      influencer_id: {
        type: DataTypes.INTEGER,
        defaultValue: null
      },
      campaign_id: {
        type: DataTypes.INTEGER,
        defaultValue: null
      },
      application_status_id: {
        type: DataTypes.INTEGER,
        defaultValue: null
      },
      campaign_status_id: {
        type: DataTypes.INTEGER,
        defaultValue: null
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
  return campaign_application;
};
