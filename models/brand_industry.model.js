const tableNames = require("../utils/table_name");
module.exports = (sequelize, DataTypes) => {

    const brand_industry = sequelize.define("brand_industry", {
        brand_industry_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        brand_id: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        industry_id: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
       
        delete_flag: {
            type: DataTypes.TINYINT,
            defaultValue: 0
        },
       
    },{
 createdAt: true,
 updatedAt: false
    })
    return brand_industry
}