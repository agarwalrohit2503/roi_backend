const tableNames = require("../utils/table_name");
module.exports = (sequelize, DataTypes) => {
  const influencer_type = sequelize.define(
    "influencer_type",
    {
      influencer_type_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      type: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
    },
    {
      createdAt: true,
      updatedAt: false,
    }
  );
  return influencer_type;
};
