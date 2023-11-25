const tableNames = require("../utils/table_name");
module.exports = (sequelize, DataTypes) => {
  const campaign_number_of_influencers = sequelize.define(
    "campaign_number_of_influencers",
    {
      campaign_number_of_influencers_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      campaign_id: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      nano: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      micro: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      macro: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      mega: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      celeb: {
        type: DataTypes.INTEGER,
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
  return campaign_number_of_influencers;
};
