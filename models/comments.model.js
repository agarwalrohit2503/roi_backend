module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define(
    "comments",
    {
      comment_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      campaign_applied_id: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      influencer_id: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      brand_id: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      sender_type: {
        type: DataTypes.STRING(5),
        defaultValue: null,
      },

      comment_text: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      comment_file: {
        type: DataTypes.TEXT,
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
  return Comments;
};
