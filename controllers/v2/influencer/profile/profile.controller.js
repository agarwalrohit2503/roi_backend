const tableNames = require("../../../../utils/table_name");
const { db, sequelize } = require("../../../../utils/conn");
const { addAddress } = require("../address/address.controller");

async function getProfile(req, res) {
  const influencer_id = req.params.influencer_id;

  const influencer = await tableNames.influencer.findAll({
    where: { influencer_id: influencer_id },
    include: [
      {
        //attributes: ["content_niche_id", "content_niche_name"],
        model: tableNames.influencerContentNiche,
        //  as: "inf_content",
        include: [
          {
            //attributes: ["content_niche_id", "content_niche_name"],
            model: tableNames.contentNiche,
            // as: "content_nich",
          },
        ],
        
      },
      {
        model: tableNames.influencerAddress,
        // as: "address",
        include: [
          {
            attributes: ["state_id", "state_name"],
            model: tableNames.State,
            // as: "influencer_state",
          },
          {
            attributes: ["city_id", "city_name"],
            model: tableNames.City,
            // as: "influencer_city",
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
      {
        model: tableNames.influencerPrice,
      }, ],
  });

  if (influencer != "") {
    res.status(200).send({
      status: 200,
      message: "influencer found",
      data: influencer,
    });
  } else {
    res.status(404).send({
      status: 404,
      message: "influencer not found",
    });
  }
}

async function updateProfile(req, res) {
  influencer_id = req.params.influencer_id;

  //influencer_address_id = req.body.influencer_address_id;
  profile_status = req.body.profile_status;

  var name = req.body.name;
  var email = req.body.email;
  var gender = req.body.gender;
  var mobile_number = req.body.mobile_number;
  var dob = req.body.dob;
  var pan_card = req.body.pan_card;
  var gst_number = req.body.gst_number;
  var bio = req.body.bio;

  try {
    const result = await tableNames.influencer.update(
      {
        name: name,
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

async function updateInfluencerPrice(req, res) {
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
}

async function addContentNiche(req, res) {
  influencer_id = req.params.influencer_id;
  content_niche_id = req.body.content_niche_id;

  try {
    findQuery = await tableNames.influencerContentNiche.findAll({
      where: { influencer_id: influencer_id },
    });
    if (findQuery == "") {
      const data = content_niche_id.map(async (result) => {
        await tableNames.influencerContentNiche.create({
          influencer_id: influencer_id,
          content_niche_id: result,
        });
      });

      if (!data) {
        res.status(400).send({
          status: 400,
          message: "Influencer content niche not updated",
        });
      } else {
        res.status(200).send({
          status: 200,
          message: "Influencer content niche updated",
        });
      }
    } else {
      const deleteQuery = await tableNames.influencerContentNiche.destroy({
        where: { influencer_id: influencer_id },
      });
      if (deleteQuery == 0) {
        res.status(200).send({
          status: 200,
          message: "Content niche not deleted",
        });
      } else {
        const data = content_niche_id.map(async (result) => {
          await tableNames.influencerContentNiche.create({
            influencer_id: influencer_id,
            content_niche_id: result,
          });
        });

        if (!data) {
          res.status(400).send({
            status: 400,
            message: "Influencer content niche not update",
          });
        } else {
          res.status(200).send({
            status: 200,
            message: "Influencer content niche updated",
          });
        }
      }
    }
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Internal error",
    });
  }
}

module.exports = {
  getProfile,
  updateProfile,
  updateInfluencerPrice,
  addContentNiche,
};
