module.exports = (sequelize, DataTypes) => {

    const favourite_influencer = sequelize.define("favourite_influencer", {
        favourite_influencer_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        influencer_id: {
            type: DataTypes.INTEGER,
          //  defaultValue: '0'
        },
        brand_id: {
            type: DataTypes.INTEGER,
          //  defaultValue: '0'
        },
        favourite_influencer_flag: {
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
    return favourite_influencer
}