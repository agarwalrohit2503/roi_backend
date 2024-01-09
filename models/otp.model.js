module.exports = (sequelize, DataTypes) => {
  const otp = sequelize.define(
    "otp",
    {
      otp_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      influencer_id: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      brand_id: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      otp_code: {
        type: DataTypes.BIGINT,
        defaultValue: 0,
      },
      verification_code: {
        type: DataTypes.CHAR,
        defaultValue: null
      },
      number: {
        type: DataTypes.BIGINT,
        defaultValue: null,
      },
      email: {
        type: DataTypes.STRING,
        // allowNull: false,
        defaultValue: null,
      },
      inf_email: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      otp_flag: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
      },
    },
    {
      createdAt: true,
      updatedAt: false,
    }
  );
  return otp;
};
