module.exports = (sequelize, DataTypes) => {

    const otp = sequelize.define("otp", {
        otp_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        influencer_id: {
            type: DataTypes.INTEGER,
            defaultValue: '0'
        },
        brand_id: {
            type: DataTypes.INTEGER,
            defaultValue: '0'
        },
        otp_code:{
            type: DataTypes.INTEGER,
            defaultValue: '0'
        },
        otp_flag:{
            type: DataTypes.INTEGER,
            defaultValue: '0'
        },     
    },{
 createdAt: true,
 updatedAt: false
    })
    return otp
}