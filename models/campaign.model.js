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
        defaultValue: 0,
      },
      campaign_status_id: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
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
      payment_type: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      campaign_budget: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      image_link: {
        type: DataTypes.STRING,
        allowNull: false,
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
