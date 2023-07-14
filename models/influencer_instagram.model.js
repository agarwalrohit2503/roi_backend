module.exports = (sequelize, DataTypes) => {

    const influencer_instagram = sequelize.define("influencer_instagram", {
        influencer_instagram_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        influencer_id: {
            type: DataTypes.INTEGER,
          //  defaultValue: '0'
        },
        // type: {
        //     type: DataTypes.TEXT,
        //   //  defaultValue: '0'
        // },
        // link: {
        //     type: DataTypes.TEXT,
        //   //  defaultValue: '0'
        // },
        // file_name: {
        //     type: DataTypes.TEXT,
        //   //  defaultValue: '0'
        // },
       
        delete_flag: {
            type: DataTypes.INTEGER,
            defaultValue: '0'
        },
       
    },{
 createdAt: true,
 updatedAt: false
    })
    return influencer_instagram
}