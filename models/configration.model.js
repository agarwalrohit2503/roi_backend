const tableNames = require("../utils/table_name");
module.exports = (sequelize, DataTypes) => {
    const configuration = sequelize.define("configuration", {
        configuration_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        config_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        config_value: {
            type: DataTypes.FLOAT,
            defaultValue: 0
        },
       
        config_flag: {
            type: DataTypes.TINYINT,
            defaultValue: 0
        },
       
    },{
 createdAt: true,
 updatedAt: false
    })
    return configuration
}