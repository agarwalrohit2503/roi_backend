module.exports = (sequelize, DataTypes) => {

    const influencer_file = sequelize.define("influencer_file", {
        influencer_file_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        influencer_id: {
            type: DataTypes.INTEGER,
            defaultValue: null
        },
        doc_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image_link: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        file_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },   
        delete_flag: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
       
    },{
 createdAt: true,
 updatedAt: false
    })
    return influencer_file
}