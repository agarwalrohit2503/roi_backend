const tableNames = require("../../../../utils/table_name");

const operatorsAliases = require("../../../../utils/operator_aliases");

async function getInfluencerList(req, res) {
  var limit = req.query.limit;
  var offset = req.query.offset;
  var search_term = req.query.search_term;

  const findQuery = await tableNames.influencer.findAll({
    where: {
      ...(search_term
        ? { name: { [operatorsAliases.$like]: `%${search_term}%` } }
        : {}),
    },
    include: [
      {
        //attributes: ["content_niche_id", "content_niche_name"],
        model: tableNames.influencerContentNiche,
        // as: "inf_content",
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
        //    as: "address",
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
      },
    ],
    offset: Number.parseInt(offset ? offset : 0),
    limit: Number.parseInt(limit ? limit : 20),
  });

  console.log(findQuery);
  if (findQuery != "") {
    res.status(200).send({
      status: 404,
      message: "Brand",
      data: findQuery,
    });
  } else {
    res.status(404).send({
      status: 404,
      message: "influencer not found",
    });
  }
}

async function getInfluencerDemoList(req, res) {
  getInfluencerList(req, res);
}

async function getInfluencerDetails(req, res) {
  var influencer_id = req.params.influencer_id;

  const findQuery = await tableNames.influencer.findAll({
    where: {
      influencer_id: influencer_id,
    },
    include: [
      {
        model: tableNames.influencerContentNiche,
        //as: "inf_content",
        include: [
          {
            model: tableNames.contentNiche,
            // as: "content_nich",
          },
        ],
      },
      {
        model: tableNames.influencerAddress,
        //  as: "address",
        include: [
          {
            attributes: ["state_id", "state_name"],
            model: tableNames.State,
          },
          {
            attributes: ["city_id", "city_name"],
            model: tableNames.City,
          },
        ],
      },
      {
        model: tableNames.influencerPrice,
      },
    ],
  });
  res.status(200).send({
    status: 404,
    message: "influencer details",
    data: findQuery,
  });
}

async function markFavourite(req, res) {
  const brand_id = req.params.brand_id;

  const influencer_id = req.body.influencer_id;
  console.log(influencer_id);
  const findQquery = await tableNames.favouriteInfluencer.findOne({
    where: { influencer_id: influencer_id, brand_id: brand_id },
  });

  if (!findQquery) {
    let favInfo = {
      brand_id: brand_id,
      influencer_id: influencer_id,
    };

    const insertQuery = await tableNames.favouriteInfluencer.create(favInfo);
    if (!insertQuery) {
      res.status(404).send({
        status: 404,
        message: "error",
      });
    } else {
      const updateQuery = await tableNames.favouriteInfluencer.update(
        { favourite_influencer_flag: 1 },
        { where: { influencer_id: influencer_id, brand_id: brand_id } }
      );
      if (!updateQuery) {
        res.status(200).send({
          status: 200,
          message: "Influencer not marked as a favorite",
        });
      } else {
        res.status(200).send({
          status: 200,
          message: "Influencer marked as a favorite",
        });
      }
    }
  } else {
    if (findQquery["favourite_influencer_flag"] == 1) {
      const updataQuery = await tableNames.favouriteInfluencer.update(
        { favourite_influencer_flag: 0 },
        { where: { influencer_id: influencer_id, brand_id: brand_id } }
      );
      res.status(200).send({
        status: 200,
        //cartstatus: 0,
        message: updataQuery,
      });
    } else {
      const updataQuery = await tableNames.favouriteInfluencer.update(
        {
          favourite_influencer_flag: 1,
        },
        { where: { influencer_id: influencer_id, brand_id: brand_id } }
      );

      res.status(200).send({
        status: 200,

        message: updataQuery,
      });
    }
  }
}

async function getFavouriteInfluencers(req, res) {
  var limit = req.query.limit;
  var offset = req.query.offset;
  var search_term = req.query.search_term;
  var brand_id = req.params.brand_id;

  const fingQuery = await tableNames.favouriteInfluencer.findAll({
    // attributes: ["favourite_influencer_id"],
    include: [
      {
        // attributes: [
        //   "influencer_id",
        //   "name",
        //   "email",
        //   "number",
        //   "dob",
        //   "pan_card",
        //   "gst_number",
        //   "bio",
        //   "profile_status",
        // ],
        model: tableNames.influencer,
        where: {
          ...(search_term
            ? { name: { [operatorsAliases.$like]: `%${search_term}%` } }
            : {}),
        },
        include: [
         
          {
            model: tableNames.influencerPrice,
          },
          {
            attributes: ["influencer_content_niche_id", "content_niche_id"],
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
            ],
          },
          {
            model: tableNames.influencerFacebook,
          },
          {
            model: tableNames.influencerInstagram,
          },
          {
            model: tableNames.influencerYoutube,
          },
        ],
      },
    ],
    where: {
      brand_id: brand_id,
      favourite_influencer_flag: 1,
    },
    offset: Number.parseInt(offset ? offset : 0),
    limit: Number.parseInt(limit ? limit : 20),
  });

  res.status(404).send({
    status: 200,
    message: "brand favorite Influencer lists ",
    data: fingQuery,
  });
}

module.exports = {
  getInfluencerList,
  getInfluencerDemoList,
  getInfluencerDetails,
  markFavourite,
  getFavouriteInfluencers,
};
