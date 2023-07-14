module.exports = (sequelize, DataTypes) => {

    const content_niche = sequelize.define("content_niche", {
        content_niche_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        content_niche_name: {
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
    return content_niche
}