const tableNames = require("../utils/table_name");
module.exports = (sequelize, DataTypes) => {
  const campaign_images = sequelize.define(
    "campaign_images",
    {
      campaign_images_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      campaign_id: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      image_link: {
        type: DataTypes.STRING,
        defaultValue: null,
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
  return campaign_images;
};
