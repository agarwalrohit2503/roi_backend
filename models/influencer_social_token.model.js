const tableNames = require("../utils/table_name");
module.exports = (sequelize, DataTypes) => {
  const fb_access_tokens = sequelize.define(
    "fb_access_tokens",
    {
      influencer_social_tokens_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fb_tokens: {
        type: DataTypes.CHAR,
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
  return fb_access_tokens;
};
