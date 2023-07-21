module.exports = (sequelize, DataTypes) => {
  const brand_type = sequelize.define(
    "brand_type",
    {
      brand_type_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      brand_type_name: {
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
  return brand_type;
};
