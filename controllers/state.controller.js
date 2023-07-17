
const tableNames = require("../utils/table_name");
const {db,sequelize} = require('../utils/conn');
var jwt = require('jsonwebtoken');



async function getState(req,  res){
    selectQuery = `SELECT * FROM ${tableNames.state}`;
    result=await sequelize.query(selectQuery, { type: sequelize.QueryTypes.SELECT})


    if (result.length != 0) {
        res.status(200).send(
            { 
            "status":200, 
            "message":"Data found", 
            "data":result
            }
            );
        }else{
            res.status(404).send(
            { 
                "status":404, 
                "message":"INTERNAL ERROR", 
            }
          );
    }
}

async function getCity(req,  res){

    state_id =req.query.state_id;
    selectQuery = `SELECT * FROM ${tableNames.city}  ${state_id? `WHERE state_id = ${state_id}`:''}`;
    result=await sequelize.query(selectQuery, { type: sequelize.QueryTypes.SELECT})


    if (result.length != 0) {
        res.status(200).send(
            { 
            "status":200, 
            "message":"Data found", 
            "data":result
            }
            );
        }else{
            res.status(404).send(
            { 
                "status":404, 
                "message":"INTERNAL ERROR", 
            }
          );
    }
}
module.exports = {
   // updateContentNiche,
  //  AddContentNiche,
    getCity,
    getState
}