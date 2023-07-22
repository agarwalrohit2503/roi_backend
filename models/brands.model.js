const tableNames = require("../utils/table_name");
module.exports = (sequelize, DataTypes) => {
  const brands = sequelize.define(
    "brand",
    {
      brands_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      city_id: {
        type: DataTypes.INTEGER,
        defaultValue: null
      },
      state_id: {
        type: DataTypes.INTEGER,
        defaultValue: null
      },
      brand_type_id: {
        type: DataTypes.INTEGER,
        defaultValue: null
      },
      brand_logo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },

      number: {
        type: DataTypes.BIGINT,
        unique: true,
        allowNull: false,
      },
      gst_number: { type: DataTypes.TEXT },
      website: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pan_card: { type: DataTypes.TEXT, allowNull: false },
      address: { type: DataTypes.STRING, allowNull: false },
      overview: { type: DataTypes.TEXT, allowNull: false },
      profile_status: { type: DataTypes.TINYINT, defaultValue: 0 },
      account_delete: { type: DataTypes.TINYINT, defaultValue: 0 },
    },
    {
      createdAt: true,
      updatedAt: false,
    }
  );
  return brands;
};
