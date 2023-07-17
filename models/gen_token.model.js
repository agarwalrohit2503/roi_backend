module.exports = (sequelize, DataTypes) => {

    const gen_token = sequelize.define("gen_token", {
        gen_token_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        gen_token: {
            type: DataTypes.TEXT,
           // defaultValue: '0'
        },
        influencer_id: {
            type: DataTypes.INTEGER,
            defaultValue: '0'
        },
        brand_id: {
            type: DataTypes.INTEGER,
            defaultValue: '0'
        },
       
        delete_flag: {
            type: DataTypes.INTEGER,
            defaultValue: '0'
        },
       
    },{
 createdAt: true,
 updatedAt: false
    })
    return gen_token
}