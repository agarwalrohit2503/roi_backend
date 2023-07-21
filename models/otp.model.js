module.exports = (sequelize, DataTypes) => {

    const otp = sequelize.define("otp", {
        otp_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        influencer_id: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        brand_id: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        otp_code:{
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        verification_code:{
            type: DataTypes.CHAR,
            defaultValue: 0
        },
        number:{
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        otp_flag:{
            type: DataTypes.TINYINT,
            defaultValue: 0
        },     
    },{
 createdAt: true,
 updatedAt: false
    })
    return otp
}