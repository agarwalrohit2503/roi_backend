const tableNames = require("../utils/table_name");
module.exports = (sequelize, DataTypes) => {
  const social_access_tokens = sequelize.define(
    "social_access_tokens",
    {
      social_access_tokens_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      influencer_id: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      facebook_token: {
        type: DataTypes.STRING,
      },
      instagram_token: {
        type: DataTypes.STRING,
      },
      google_token: {
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
  return social_access_tokens;
};
