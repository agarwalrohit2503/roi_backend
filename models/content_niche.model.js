module.exports = (sequelize, DataTypes) => {
  const content_niche = sequelize.define(
    "content_niche",
    {
      content_niche_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      content_niche_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image_link: {
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
  return content_niche;
};
