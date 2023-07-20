module.exports = (sequelize, DataTypes) => {
  const brands_file = sequelize.define(
    "brands_file",
    {
      brands_file_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      brand_id: {
        type: DataTypes.INTEGER,
      },
      file_type: {
        type: DataTypes.STRING,
      },
      file_link: {
        type: DataTypes.STRING,
      },
      file_name: {
        type: DataTypes.STRING,
        allowNull: true,
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
  return brands_file;
};
