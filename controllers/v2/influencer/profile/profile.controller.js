const tableNames = require("../../../../utils/table_name");
const { db, sequelize } = require("../../../../utils/conn");

async function getProfile(req, res) {
  const influencer_id = req.params.influencer_id;

  const influencer = await tableNames.influencer.findAll({
    where: { influencer_id: influencer_id },
    include: [
      {
        //attributes: ["content_niche_id", "content_niche_name"],
        model: tableNames.influencerContentNiche,
        as: "inf_content",
        include: [
          {
            //attributes: ["content_niche_id", "content_niche_name"],
            model: tableNames.contentNiche,
            as: "content_nich",
          },
        ],
      },
      {
        model: tableNames.influencerAddress,
        as: "address",
        include: [
          {
            attributes: ["state_id", "state_name"],
            model: tableNames.State,
            as: "influencer_state",
          },
          {
            attributes: ["city_id", "city_name"],
            model: tableNames.City,
            as: "influencer_city",
          },

          // {
          //   model: tableNames.State, as: "influencer_state"
          // },
          //  { model: tableNames.City, as: "influencer_city" },
        ],
        // attributes: {
        //   include: [
        //     [
        //       sequelize.literal(`(
        //       SELECT state_name
        //       FROM state
        //       WHERE
        //       state.state_id  = address.state_id
        //   )`),
        //       "stateName",
        //     ],
        //     [
        //       sequelize.literal(`(
        //       SELECT city_name
        //       FROM city
        //       WHERE
        //       city.city_id  = address.city_id
        //   )`),
        //       "cityName",
        //     ],
        //   ],
        // },
        //required: true
      },
    ],
  });

  console.log(influencer);
  if (influencer != "") {
    res.status(200).send({
      status: 404,
      message: "influencerfound",
      data: influencer,
    });
  } else {
    res.status(404).send({
      status: 404,
      message: "influencer not found",
    });
  }

  // const influencer = await tableNames.influencerAddress.findAll({
  //     where: { influencer_id: influencer_id },
  //     include: [
  //       {
  //         model: tableNames.influencer,

  //         //required: true
  //       },
  //     ],
  //   });
  //   console.log(influencer);
  //   if (influencer != '') {
  //     res.status(200).send({
  //       status: 404,
  //       message: "influencerfound",
  //       data: influencer,
  //     });
  //   } else {
  //     res.status(404).send({
  //       status: 404,
  //       message: "influencer not found",
  //     });
  //   }
}

module.exports = {
  getProfile,
};
