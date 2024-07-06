module.exports = (sequelize, DataTypes) => {
  const influencer_facebook_insights = sequelize.define(
    "influencer_facebook_insights",
    {
      influencer_facebook_insights_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      influencer_id: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      id: {
        type: DataTypes.STRING,
        defaultValue: null,
      },

      title: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      name: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      period: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      value: {
        type: DataTypes.STRING,

      },
      end_time: {
        type: DataTypes.STRING,
        defaultValue: null,
      },

      description: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
    },
    {
      createdAt: true,
      updatedAt: false,
    }
  );
  return influencer_facebook_insights;
};
