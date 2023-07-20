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
        defaultValue: "0",
      },
      state_id: {
        type: DataTypes.INTEGER,
        defaultValue: "0",
      },
      brand_type_id: {
        type: DataTypes.INTEGER,
        defaultValue: "0",
      },
      brand_logo: {
        type: DataTypes.TEXT,
      },
      name: {
        type: DataTypes.TEXT,

        // allowNull: false
      },
      email: {
        type: DataTypes.TEXT,
        unique: true,
        // allowNull: false
      },

      number: {
        type: DataTypes.TEXT,
        unique: true,
        // allowNull defaults to true
      },
      gst_number: { type: DataTypes.TEXT },
      website: {
        type: DataTypes.TEXT,
        // allowNull defaults to true
      },
      pan_card: { type: DataTypes.TEXT },
      address: { type: DataTypes.TEXT },
      overview: { type: DataTypes.TEXT },
      profile_status: { type: DataTypes.INTEGER, defaultValue: "0" },
      account_delete: { type: DataTypes.INTEGER, defaultValue: "0" },
    },
    {
      // I don't want createdAt
      createdAt: true,

      // I want updatedAt to actually be called updateTimestamp
      updatedAt: false,
    }
  );
  return brands;
};
