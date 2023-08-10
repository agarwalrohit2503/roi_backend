module.exports = (sequelize, DataTypes) => {
    const influencer_profile_status = sequelize.define(
      "influencer_profile_status",
      {
        influencer_profile_statuse_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        influencer_id: {
            type: DataTypes.INTEGER,
            defaultValue: null
          },
        profile_complete_status: {
          type: DataTypes.TINYINT,
          defaultValue: 0,
        },
       
      },
      {
        createdAt: true,
        updatedAt: false,
      }
    );
    return influencer_profile_status;
  };
  