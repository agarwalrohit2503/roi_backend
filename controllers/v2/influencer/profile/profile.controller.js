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

async function updateProfile(req, res) {
  influencer_id = req.params.influencer_id;

  influencer_address_id = req.body.influencer_address_id;
  profile_status = req.body.profile_status;

  Name = req.body.name;
  email = req.body.email;
  gender = req.body.gender;
  mobile_number = req.body.mobile_number;
  dob = req.body.dob;
  country = req.body.country;
  pan_card = req.body.pan_card;
  gst_number = req.body.gst_number;
  bio = req.body.bio;

  address = req.body.address;
  country = req.body.ountry;
  city_id = req.body.city_id;
  state_id = req.body.state_id;
  pin = req.body.pin;

  try {
    const result = await tableNames.influencer.update(
      {
        name: Name,
        email: email,
        gender: gender,
        dob: dob,
        number: mobile_number,
        pan_card: pan_card,
        gst_number: gst_number,
        bio: bio,
        profile_status: profile_status,
      },
      {
        where: {
          influencer_id: influencer_id,
        },
      }
    );

    if (result[0] != 0) {
      res.status(200).send({
        status: 200,
        message: "Influencer profile updated",
      });
    } else {
      res.status(404).send({
        status: 404,
        message: "profile not updated",
      });
    }
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err,
    });
  }
}

async function updatedInfluencerPrice(req, res) {
  influencer_id = req.params.influencer_id;
  post_cost = req.body.post_cost;
  reels_cost = req.body.reels_cost;
  video_cost = req.body.video_cost;
  story_cost = req.body.story_cost;

  try {
    const findQuery = await tableNames.influencerPrice.findOne({
      where: {
        influencer_id: influencer_id,
      },
    });

    if (findQuery == null) {
      let priceinfo = {
        influencer_id: influencer_id,
        post_cost: post_cost,
        reels_cost: reels_cost,
        video_cost: video_cost,
        story_cost: story_cost,
      };

      const createQuery = await tableNames.influencerPrice.create(priceinfo);
      if (createQuery != "") {
        res.status(200).send({
          status: 200,
          message: "Price added",
        });
      } else {
        res.status(404).send({
          status: 404,
          message: "Price not added",
        });
      }
    } else {
      const updateQuery = await tableNames.influencerPrice.update(
        {
          post_cost: post_cost,
          reels_cost: reels_cost,
          video_cost: video_cost,
          story_cost: story_cost,
        },
        {
          where: {
            influencer_id: influencer_id,
          },
        }
      );
      if (updateQuery[0] != 0) {
        res.status(200).send({
          status: 200,
          message: "Price updated",
        });
      } else {
        res.status(404).send({
          status: 404,
          message: "Price not updated",
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: error,
    });
  }

  // const sqlQuery = `
  // UPDATE ${tableNames.influencer_price} SET
  // post_cost= '${post_cost}',
  // reels_cost= '${reels_cost}',
  // video_cost= '${video_cost}',
  // story_cost= '${story_cost}' WHERE influencer_id =${influencer_id}`;

  // var result = await sequelize.query(sqlQuery, { type: sequelize.QueryTypes.UPDATE},)
}

async function addContentNiche(req, res) {
  influencer_id = req.params.influencer_id;
  content_niche_id = req.body.content_niche_id;

  findQuery = tableNames.influencerContentNiche.findAll({
    where: {
      influencer_id: influencer_id,
    },
  });
  if (findQuery == null) {
   // console.log("no data");
  } else {
  //  /console.log("data");

    const deleteQuery = await tableNames.influencerContentNiche.destroy({
      where: {
        influencer_id: influencer_id
      }
    });

    if(deleteQuery == 0){
      res.status(200).send({
        status: 200,
        message: "Content niche not deleted",
      });
    }else{

    }
    
  console.log(deleteQuery);

  }
}

async function AddContentNiche1(req, res) {
  influencer_id = req.params.influencer_id;
  content_niche_id = req.body.content_niche_id;

  sqlquery = `SELECT * FROM ${tableNames.influencer_content_niche}  WHERE influencer_id= '${influencer_id}'`;
  result = await sequelize.query(sqlquery, {
    type: sequelize.QueryTypes.SELECT,
  });

  if (result.length != 0) {
    sqldelete = `DELETE FROM ${tableNames.influencer_content_niche} WHERE  influencer_id= ${influencer_id}`;
    result = await sequelize.query(sqldelete, {
      type: sequelize.QueryTypes.DELETE,
    });
    if (!result) {
      content_niche_id.map(async (result) => {
        const sqlQuery = `
    INSERT INTO ${tableNames.influencer_content_niche} 
    ( influencer_id, content_niche_id )
    VALUES
    ('${influencer_id}','${result}')`;

        var result = await sequelize.query(sqlQuery, {
          type: sequelize.QueryTypes.INSERT,
        });
        if (result.length != 0) {
          res.status(200).send({
            status: 200,
            message: "Your Content Niche added",
          });
        } else {
          res.status(404).send({
            status: 404,
            message: "INTERNAL ERROR",
          });
        }
      });
    } else {
      res.status(404).send({
        status: 404,
        message: "Your preview content niche not deleted",
      });
    }
  } else {
    content_niche_id.map(async (result) => {
      const sqlQuery = `
    INSERT INTO ${tableNames.influencer_content_niche} 
    ( influencer_id, content_niche_id )
    VALUES
    ('${influencer_id}','${result}')`;

      var result = await sequelize.query(sqlQuery, {
        type: sequelize.QueryTypes.INSERT,
      });
      if (result.length != 0) {
        res.status(200).send({
          status: 200,
          message: "Your Content Niche added",
        });
      } else {
        res.status(404).send({
          status: 404,
          message: "INTERNAL ERROR",
        });
      }
    });
  }
}

// if (influencer_address_id > 0) {
//   const sqlquery = await tableNames.influencerAddress.update(
//     {
//       address: address,
//       country: country,
//       city_id: city_id,
//       state_id: state_id,
//       pin: pin,
//     },
//     {
//       where: {
//         influencer_id: influencer_id,
//         influencer_address_id: influencer_address_id,
//       },
//     }
//   );
//   if (result[0] != 0) {
//     res.status(200).send({
//       status: 200,
//       message: "Influencer profile & address updated",
//     });
//   } else {
//     res.status(200).send({
//       status: 200,
//       message: "Influencer profile address not updates",
//     });
//   }
// }
module.exports = {
  getProfile,
  updateProfile,
  updatedInfluencerPrice,
  addContentNiche,
};
