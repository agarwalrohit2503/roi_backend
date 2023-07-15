module.exports = (sequelize, DataTypes) => {

    const City = sequelize.define("city", {
        city_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        
        state_id: {
            type: DataTypes.INTEGER,
            defaultValue: '0'
        },
        city_name: {
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
    return City
}