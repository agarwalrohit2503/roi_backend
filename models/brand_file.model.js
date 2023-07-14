module.exports = (sequelize, DataTypes) => {

    const brands_file = sequelize.define("brands_file", {
        brands_file_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        brand_id: {
            type: DataTypes.INTEGER,
          //  defaultValue: '0'
        },
        type: {
            type: DataTypes.TEXT,
          //  defaultValue: '0'
        },
        link: {
            type: DataTypes.TEXT,
          //  defaultValue: '0'
        },
        file_name: {
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
    return brands_file
}