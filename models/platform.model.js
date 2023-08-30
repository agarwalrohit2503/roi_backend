const tableNames = require("../utils/table_name");
module.exports = (sequelize, DataTypes) => {
  const platform = sequelize.define(
    "platform",
    {
      platform_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      platform_name: {
        type: DataTypes.STRING,
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
  return platform;
};
