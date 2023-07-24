const tableNames = require("../../../../utils/table_name");


async function addAddress(req, res) {
  
const  influencer_id = req.params.influencer_id;
const  address       = req.body.address;
const  city_id       = req.body.city_id;
const  state_id      = req.body.state_id;
const  pin           = req.body.pin;
const  country       = req.body.country;


 try {

    let addressInfo = {
        influencer_id:influencer_id,
        address: address,
        city_id: city_id,
        state_id: state_id,
        pin: pin,
        country: country,
      };
    
      const updateQuery = await tableNames.influencerAddress.create(addressInfo);
      if (updateQuery != '') {
        res.status(200).send({
          status: 200,
          message: "address updated",
        });
      } else {
        res.status(404).send({
          status: 404,
          message: "address not updated",
        });
      }
    
} catch (error) {
    res.status(200).send({
        status: 200,
        message: "Server Internal Error", //city_id & state_id is required
      });
}
}

// async function addAddress1(req, res) {
//   var requiredFields = ["city_id", "state_id"];
//   // return Object.keys(req.body).every((key) => requiredFields.includes(key));

//   influencer_id = req.params.influencer_id;
//   address = req.body.address;
//   city_id = req.body.city_id;
//   state_id = req.body.state_id;
//   pin = req.body.pin;
//   country = req.body.country;
//   const sqlQuery = `
//     INSERT INTO ${tableNames.influencer_address} 
//     ( influencer_id, address, country,city_id, state_id, pin )
//      VALUES 
//      ('${influencer_id}','${address}','${country}','${city_id}','${state_id}','${pin}')
//     `;

//   var result = await sequelize.query(sqlQuery, {
//     type: sequelize.QueryTypes.INSERT,
//   });
//   if (result.length != 0) {
//     res.status(200).send({
//       status: 200,
//       message: "address updated",
//     });
//   } else {
//     res.status(404).send({
//       status: 404,
//       message: "address not updated",
//     });
//   }
// }


async function getAddress(req, res) {
    const influencer_id = req.params.influencer_id;

    findQuery = await tableNames.influencerAddress.findAll({
        where:{
            influencer_id:influencer_id
        }
    })
  
    if (findQuery != '') {
      res.status(200).send({
        status: 200,
        message: "Influencer address",
        data: findQuery,
      });
    } else {
      res.status(404).send({
        status: 404,
        message: "address not found",
      });
    }
  }

async function getAddress1(req, res) {
  const influencer_id = req.params.influencer_id;
  selectQuery = `SELECT * FROM ${tableNames.influencer_address} where influencer_id =${influencer_id} and 	delete_flag = 0`;
  result = await sequelize.query(selectQuery, {
    type: sequelize.QueryTypes.SELECT,
  });

  if (result.length != 0) {
    res.status(200).send({
      status: 200,
      message: "your address",
      data: result,
    });
  } else {
    res.status(404).send({
      status: 404,
      message: "addressnot found",
    });
  }
}

async function deleteAddress(req, res) {
  influencer_id = req.params.influencer_id;
  influencer_address_id = req.body.influencer_address_id;

  const sqlQuery = `
    UPDATE ${tableNames.influencer_address} SET 
    
    delete_flag= 1 WHERE influencer_id =${influencer_id} and influencer_address_id =${influencer_address_id}`;

  var result = await sequelize.query(sqlQuery, {
    type: sequelize.QueryTypes.UPDATE,
  });
  if (result.length != 0) {
    res.status(200).send({
      status: 200,
      message: " address updated",
    });
  } else {
    res.status(404).send({
      status: 404,
      message: " address not updated",
    });
  }
}

async function editAddress(req, res) {
  influencer_id = req.params.influencer_id;

  influencer_address_id = req.body.influencer_address_id;

  address = req.body.address;
  country = req.body.country;
  city_id = req.body.city_id;
  state_id = req.body.state_id;
  pin = req.body.pin;

  const sqlQuery = `UPDATE ${tableNames.influencer_address} SET address= '${address}', country= '${country}', city_id= '${city_id}', state_id= '${state_id}', pin= '${pin}' WHERE influencer_id = ${influencer_id} and influencer_address_id = ${influencer_address_id}`;
  // `UPDATE ${tableNames.influencer_address} SET address= "address" WHERE influencer_id =37 and influencer_address_id =7;`;
  var result = await sequelize.query(sqlQuery, {
    type: sequelize.QueryTypes.UPDATE,
  });
  if (result.length != 0) {
    res.status(200).send({
      status: 200,
      message: " address updated",
    });
  } else {
    res.status(404).send({
      status: 404,
      message: " address not updated",
    });
  }
}

module.exports = {
  addAddress,
  getAddress,
  deleteAddress,
  editAddress,
};
