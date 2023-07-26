const tableNames = require("../../../../utils/table_name");

const operatorsAliases = require("../../../../utils/operator_aliases");
var jwt = require("jsonwebtoken");

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

async function updateBrandprofile(req, res) {
  const brand_id = req.params.brand_id;
  const brand_logo = req.body.brand_logo;
  const brand_type_id = req.body.brand_type_id;
  const Name = req.body.name;
  const email = req.body.email;
  const number = req.body.number;
  const pan_card = req.body.pan_card;
  const gst_number = req.body.gst_number;
  const website = req.body.website;
  const address = req.body.address;
  const overview = req.body.overview;
  const city_id = req.body.city_id;
  const state_id = req.body.state_id;
  const profile_status = 1;

  try {
  const result = await tableNames.brands.update(
    {
      brand_logo: brand_logo,
      brand_type_id: brand_type_id,
      Name: Name,
      email: email,
      number: number,
      pan_card: pan_card,
      gst_number: gst_number,
      website: website,
      address: address,
      overview: overview,
      city_id: city_id,
      state_id: state_id,
      profile_status: 1,
    },
    {
      where: {
        brands_id: brand_id,
      },
    }
  );

  console.log(result);
  if (result[0] != "") {
    industry_ids = req.body.industry_ids;

    findQuery = await tableNames.brandIndustry.findAll({
      where: { brand_id: brand_id },
    });

    if (findQuery == "") {
      const data = industry_ids.map(async (result) => {
        await tableNames.brandIndustry.create({
          brand_id: brand_id,
          industry_id: result,
        });
      });

      if (!data) {
        res.status(400).send({
          status: 400,
          message: "Brand industry not updated",
        });
      } else {
        res.status(200).send({
          status: 200,
          message: "Brand industry updated",
        });
      }
    } else {
      const deleteQuery = await tableNames.brandIndustry.destroy({
        where: { brand_id: brand_id },
      });
      if (deleteQuery == 0) {
        res.status(200).send({
          status: 200,
          message: "Content niche not deleted",
        });
      } else {
        const data = industry_ids.map(async (result) => {
          await tableNames.brandIndustry.create({
            brand_id: brand_id,
            industry_id: result,
          });
        });

        if (!data) {
          res.status(400).send({
            status: 400,
            message: "Brand content niche not update",
          });
        } else {
          res.status(200).send({
            status: 200,
            message: "Brand content niche updated",
          });
        }
      }
    }
  } else {
    res.status(404).send({
      status: 404,
      message: "brand profile not updated",
    });
  }

  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err,
    });
  }
}

module.exports = {
    getInfluencerList,
  updateBrandprofile,
};
