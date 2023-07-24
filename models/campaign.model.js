const tableNames = require("../utils/table_name");
module.exports = (sequelize, DataTypes) => {
  const campaign = sequelize.define(
    "campaign",
    {
      campaign_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      brand_id: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      campaign_status_id: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      campaign_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      campaign_about: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      language: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      campaign_start_dt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      campaign_end_dt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      campaign_pay_type: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      campaign_budget: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      image_link: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      eligibility: {
        type: DataTypes.STRING,
        defaultValue: false,
      },
      campaign_delete: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
      },
    },
    {
      createdAt: true,
      updatedAt: false,
    }
  );
  return campaign;
};
