const tableNames = require("../utils/table_name");
module.exports = (sequelize, DataTypes) => {
  const influencer_language = sequelize.define(
    "influencer_language",
    {
      influencer_language_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      language_id: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      influencer_id: {
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
  return influencer_language;
};
