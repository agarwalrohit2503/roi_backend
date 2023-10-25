const tableNames = require("../utils/table_name");
module.exports = (sequelize, DataTypes) => {
  const campaign_language = sequelize.define(
    "campaign_language",
    {
      campaign_language_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      language_id: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      campaign_id: {
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
  return campaign_language;
};
