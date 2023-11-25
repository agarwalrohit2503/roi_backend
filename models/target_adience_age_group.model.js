module.exports = (sequelize, DataTypes) => {
  const target_adience_age_group = sequelize.define(
    "target_adience_age_group",
    {
      target_adience_age_group_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      target_adience_age_group: {
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
  return target_adience_age_group;
};
