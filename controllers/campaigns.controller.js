
const tableNames = require("../utils/table_name");
const {db,sequelize} = require('../utils/conn');
var jwt = require('jsonwebtoken');


async function getCampaigns(req,  res){

    selectQuery = `SELECT 
    c.campaign_id,
    c.brand_id,
    c.campaign_name,
    c.campaign_about,
    c.language,
    c.campaign_budget,
    c.createdAt
     FROM ${tableNames.campaign} as c 
     ${req.query.limit ? `limit ${req.query.limit} ` : ''}
     ${req.query.offset ? `offset ${req.query.offset} ` : ''}` ;
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

async function getCampaignDetails(req,  res){

    campaign_id  =req.params.campaign_id;
    selectQuery = `SELECT * FROM ${tableNames.campaign}  ${campaign_id? `WHERE campaign_id  = ${campaign_id}`:''}`;
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
                "message":"Campaign not found", 
            }
          );
    }
}

async function addCampaigns(req, res){

Name = req.body.Name;

    test=["1,2,3"];
    sqlQuery = `INSERT INTO  ${tableNames.campaign}
    (brand_id) 
    VALUES ('${test}')`;

    result=await sequelize.query(sqlQuery, { type: sequelize.QueryTypes.INSERT})
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
    addCampaigns,
    getCampaignDetails,
    getCampaigns,
   
}