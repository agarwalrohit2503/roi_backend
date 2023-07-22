const tableNames = require("../utils/table_name");
module.exports = (sequelize, DataTypes) => {
  const gen_token = sequelize.define(
    "gen_token",
    {
      gen_token_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      gen_token: {
        type: DataTypes.CHAR,
        
      },
      influencer_id: {
        type: DataTypes.INTEGER,
        defaultValue: null
      },
      brand_id: {
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
  return gen_token;
};
