module.exports = (sequelize, DataTypes) => {
  const target_audience_gender = sequelize.define(
    "target_audience_gender",
    {
      target_audience_gender_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      target_audience_gender_name: {
        type: DataTypes.STRING,
        allowNull: false,
        //  defaultValue: '0'
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
  return target_audience_gender;
};
