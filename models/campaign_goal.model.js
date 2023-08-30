const tableNames = require("../utils/table_name");
module.exports = (sequelize, DataTypes) => {
  const campaign_goal = sequelize.define(
    "campaign_goal",
    {
      campaign_goal_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      goal_name: {
        type: DataTypes.STRING,
      },
      goal_desc: {
        type: DataTypes.STRING,
        defaultValue: 'NONE',
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
  return campaign_goal;
};
