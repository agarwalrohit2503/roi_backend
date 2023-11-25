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
      campaign_goal_id: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      campaign_status_id: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      payment_status_id: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      barter_note: {
        type: DataTypes.STRING,
        allowNull: false,
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
      about_product: {
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
      content_submission_deadline: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      content_upload_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      campaign_budget: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      eligibility: {
        type: DataTypes.TINYINT,
        defaultValue: null,
      },
      additional_notes: {
        type: DataTypes.STRING,
        defaultValue: null,
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
