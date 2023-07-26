const tableNames = require("../utils/table_name");
module.exports = (sequelize, DataTypes) => {

    const application_status = sequelize.define("application_status", {
        application_status_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        application_status_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        delete_flag: {
            type: DataTypes.TINYINT,
            defaultValue: 0
        },
       
    },{
 createdAt: true,
 updatedAt: false
    })
    return application_status
}