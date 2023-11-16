const tableNames = require("../utils/table_name");
module.exports = (sequelize, DataTypes) => {
  const campaign_application_content = sequelize.define(
    "campaign_application_content",
    {
      campaign_application_content_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      campaign_applied_id: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },

      link: {
        type: DataTypes.STRING,
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
  return campaign_application_content;
};
