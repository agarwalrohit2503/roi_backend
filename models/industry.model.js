module.exports = (sequelize, DataTypes) => {

    const industry = sequelize.define("industry", {
        industry_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        industry_name: {
            type: DataTypes.TEXT,
          //  defaultValue: '0'
        },
        delete_flag: {
            type: DataTypes.INTEGER,
            defaultValue: '0'
        },
       
    },{
 createdAt: true,
 updatedAt: false
    })
    return industry
}