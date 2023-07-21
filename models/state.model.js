module.exports = (sequelize, DataTypes) => {

    const state = sequelize.define("state", {
        state_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        state_name: {
            type: DataTypes.STRING,
            allowNull: false,
          //  defaultValue: '0'
        },
        delete_flag: {
            type: DataTypes.TINYINT,
            defaultValue: '0'
        },
       
    },{
 createdAt: true,
 updatedAt: false
    })
    return state
}