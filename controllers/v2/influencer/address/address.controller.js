const tableNames = require("../../../../utils/table_name");
const { success, error } = require("../../../../utils/responseApi");
async function addAddress(req, res) {
  const influencer_id = req.params.influencer_id;
  const address = req.body.address;
  const city_id = req.body.city_id;
  const state_id = req.body.state_id;
  const pin = req.body.pin;
  const country = req.body.country;
  var primanytype = req.body.primanytype;

  if (primanytype == 1) {
    try {
      const addressupdateQuery = await tableNames.influencerAddress.update(
        { primary_address: 0 },
        { where: { influencer_id: influencer_id } }
      );

      if (addressupdateQuery[0] == 0) {
        res.status(409).send({
          status: 409,
          message: "address not updated",
        });
      } else {
        let addressInfo = {
          influencer_id: influencer_id,
          address: address,
          city_id: city_id,
          state_id: state_id,
          pin: pin,
          country: country,
          primary_address: 1,
        };

        const insertQuery = await tableNames.influencerAddress.create(
          addressInfo
        );
        if (insertQuery != "") {
          res.status(200).send({
            status: 200,
            message: "address inserted",
          });
        } else {
          res.status(404).send({
            status: 404,
            message: "address not inserted",
          });
        }
      }
    } catch (err) {
      res.status(400).send({
        status: 500,
        message: "Server Internal Error",
      });
    }
  } else {
    try {
      const influencerfindAddressQuery =
        await tableNames.influencerAddress.findOne({
          where: { influencer_id: influencer_id },
        });

        console.log(influencerfindAddressQuery);

      // let addressInfo = {
      //   influencer_id: influencer_id,
      //   address: address,
      //   city_id: city_id,
      //   state_id: state_id,
      //   pin: pin,
      //   country: country,
      // };

      // const insertQuery = await tableNames.influencerAddress.create(
      //   addressInfo
      // );
      // if (insertQuery != "") {
      //   res.status(200).send({
      //     status: 200,
      //     message: "address inserted",
      //   });
      // } else {
      //   res.status(404).send({
      //     status: 404,
      //     message: "address not inserted",
      //   });
      // }
    } catch (error) {
      res.status(400).send({
        status: 500,
        message: "Server Internal Error",
      });
    }
  }
}

async function getAddress(req, res) {
  const influencer_id = req.params.influencer_id;
  //  try {
  findQuery = await tableNames.influencerAddress.findAll({
    attributes: [
      "influencer_address_id",
      "influencer_id",
      "address",
      "country",
      "pin",
      "state_id",
      "primary_address",
    ],
    where: { influencer_id: influencer_id, delete_flag: 0 },
    include: [
      {
        attributes: ["state_name"],
        model: tableNames.State,
        // as: "influencer_state",
      },
      {
        attributes: ["city_name"],
        model: tableNames.City,
        // as: "influencer_city",
      },
    ],
  });
  res.status(200).send({
    status: 200,
    message: "Influencer address",
    data: findQuery,
  });
  // } catch (error) {
  //   res.status(400).send({
  //     status: 400,
  //     error: error,
  //     message: "Internal Error",
  //   });
  // }
}

async function deleteAddress(req, res) {
  influencer_id = req.params.influencer_id;
  influencer_address_id = req.body.influencer_address_id;

  deleteQuery = await tableNames.influencerAddress.update(
    {
      delete_flag: 1,
    },
    {
      where: {
        influencer_id: influencer_id,
        influencer_address_id: influencer_address_id,
      },
    }
  );
  if (deleteQuery != "") {
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

  deleteQuery = await tableNames.influencerAddress.update(
    {
      address: address,
      country: country,
      city_id: city_id,
      state_id: state_id,
      pin: pin,
    },
    {
      where: {
        influencer_id: influencer_id,
        influencer_address_id: influencer_address_id,
      },
    }
  );

  if (deleteQuery != "") {
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

async function addPrimaryAddress(req, res) {
  var influencer_id = req.params.influencer_id;
  var influencer_address_id = req.body.influencer_address_id;

  const findPrimaryAddress = await tableNames.influencerAddress.findOne({
    where: {
      influencer_id: influencer_id,
      influencer_address_id: influencer_address_id,
      delete_flag: 0,
    },
  });
  var addPrimaryAddressUpdateQuery = await tableNames.influencerAddress.update(
    { primary_address: findPrimaryAddress.primary_address == 1 ? 0 : 1 },
    {
      where: {
        influencer_id: influencer_id,
        influencer_address_id: influencer_address_id,
      },
    }
  );
  findPrimaryAddress.primary_address == 1
    ? success(
        res,
        "Primary address removed successfully",
        "Primary address",
        addPrimaryAddressUpdateQuery,
        1
      )
    : success(
        res,
        "Primary address added successfully",
        "Primary address",
        addPrimaryAddressUpdateQuery,
        1
      );
}

module.exports = {
  addAddress,
  getAddress,
  deleteAddress,
  editAddress,
  addPrimaryAddress,
};
