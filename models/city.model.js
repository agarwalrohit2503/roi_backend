const tableNames = require("../utils/table_name");
module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define(
    "city",
    {
      city_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      state_id: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      city_name: {
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
  return City;
};
