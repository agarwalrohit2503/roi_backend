const tableNames = require("../utils/table_name");
module.exports = (sequelize, DataTypes) => {
  const language = sequelize.define(
    "language",
    {
      language_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      language_name: {
        type: DataTypes.STRING,
        allowNull: false,
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
  return language;
};
