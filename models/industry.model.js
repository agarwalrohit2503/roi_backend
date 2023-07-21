module.exports = (sequelize, DataTypes) => {
  const industry = sequelize.define(
    "industry",
    {
      industry_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      industry_name: {
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
  return industry;
};
