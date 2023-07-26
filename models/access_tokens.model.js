const tableNames = require("../utils/table_name");
module.exports = (sequelize, DataTypes) => {
  const access_tokens = sequelize.define(
    "access_tokens",
    {
      access_tokens_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      access_tokens: {
        type: DataTypes.CHAR,
      },
      influencer_id: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      brand_id: {
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
  return access_tokens;
};
