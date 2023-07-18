const tableNames = require("../../../utils/table_name");
const {db,sequelize} = require('../../../utils/conn');
var jwt = require('jsonwebtoken');


async function add_address(req, res){
    influencer_id = req.params.influencer_id;
    address  = req.body.address;
    city_id  = req.body.city_id;
    state_id = req.body.state_id;
    pin = req.body.pin;
    country= req.body.country;
    const sqlQuery = `
    INSERT INTO ${tableNames.influencer_address} 
    ( influencer_id, address, country,city_id, state_id, pin )
     VALUES 
     ('${influencer_id}','${address}','${country}','${city_id}','${state_id}','${pin}')
    `;
  
    var result = await sequelize.query(sqlQuery, { type: sequelize.QueryTypes.INSERT},)
  if (result.length != 0) {
   
    res.status(200).send(
      { 
        "status":200, 
        "message":"address updated", 
      }
      );
  }else{
   
      res.status(404).send(
        { 
          "status":404, 
          "message":"address not updated", 
        }
        );
  }
}

async function getAddress(req,  res){
    const influencer_id = req.params.influencer_id;
    selectQuery = `SELECT * FROM ${tableNames.influencer_address} where influencer_id =${influencer_id}`;
    result=await sequelize.query(selectQuery, { type: sequelize.QueryTypes.SELECT})


    if (result.length != 0) {
        res.status(200).send(
            { 
            "status":200, 
            "message":"your address", 
            "data":result
            }
            );
        }else{
            res.status(404).send(
            { 
                "status":404, 
                "message":"addressnot found", 
            }
          );
    }
}
  
async function deleteAddress(req, res){

    influencer_id = req.params.influencer_id;
    influencer_address_id = req.body.influencer_address_id;
   
  
    const sqlQuery = `
    UPDATE ${tableNames.influencer_address} SET 
    
    delete_flag= 1 WHERE influencer_id =${influencer_id} and influencer_address_id =${influencer_address_id}`;
  
    var result = await sequelize.query(sqlQuery, { type: sequelize.QueryTypes.UPDATE},)
  if (result.length != 0) {
   
    res.status(200).send(
      { 
        "status":200, 
        "message":" address updated", 
      }
      );
  }else{
   
      res.status(404).send(
        { 
          "status":404, 
          "message":" address not updated", 
        }
        );
  }
  }
module.exports = {
    add_address,
    getAddress,
    deleteAddress
}