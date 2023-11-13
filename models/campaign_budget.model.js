const tableNames = require("../utils/table_name");

module.exports = (sequelize, DataTypes) => {
  const campaign_budget = sequelize.define(
    "campaign_budget",
    {
      campaign_budget_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      budget_range: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      budget_range: {
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
  return campaign_budget;
};
