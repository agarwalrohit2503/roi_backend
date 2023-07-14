module.exports = (sequelize, DataTypes) => {

    const configuration = sequelize.define("configuration", {
        configuration_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        config_name: {
            type: DataTypes.TEXT,
           // defaultValue: '0'
        },
        config_value: {
            type: DataTypes.FLOAT,
          //  defaultValue: '0'
        },
       
        config_flag: {
            type: DataTypes.INTEGER,
            defaultValue: '0'
        },
       
    },{
 createdAt: true,
 updatedAt: false
    })
    return configuration
}