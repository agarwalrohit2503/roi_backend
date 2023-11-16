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
      note_type: {
        type: DataTypes.TINYINT,
        defaultValue: null,
      },
      file_type: {
        type: DataTypes.STRING(20),
        defaultValue: null,
      },
      // content_approval_status: {
      //   type: DataTypes.TINYINT,
      //   defaultValue: null,
      // },

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
