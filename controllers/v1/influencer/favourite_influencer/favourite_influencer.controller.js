const tableNames = require("../../../utils/table_name");
const { db, sequelize } = require("../../../utils/conn");
var jwt = require("jsonwebtoken");

async function wishlist(req, res) {
  const influencer_id = req.body.influencer_id;
  const brand_id = req.body.brand_id;

  const wishlishquery = await tableNames.favourite_influencer.findOne({
    where: { influencer_id: influencer_id, brand_id: brand_id },
  });

  if (!wishlishquery) {
    let cartInfo = {
      brand_id: brand_id,
      influencer_id: influencer_id,
    };
    const cartData = await tableNames.favourite_influencer.create(cartInfo);

    if (!cartData) {
      res.status(404).send({
        status: 404,
        message: "error",
      });
    } else {
      const cartUpdata = await tableNames.favourite_influencer.update(
        {
          favourite_influencer_flag: 1,
        },
        { where: { influencer_id: influencer_id, brand_id: brand_id } }
      );
      res.status(200).send({
        status: 200,
        message: "cart added",
      });
    }
  } else {
    //console.log(data);

    if (wishlishquery["favourite_influencer_flag"] == 1) {
      const cartUpdata = await tableNames.favourite_influencer.update(
        {
          favourite_influencer_flag: 0,
        },
        { where: { influencer_id: influencer_id, brand_id: brand_id } }
      );
      res.status(200).send({
        status: 200,
        cartstatus: 0,
        message: cartUpdata,
      });
    } else {
      const cartUpdata = await tableNames.favourite_influencer.update(
        {
          favourite_influencer_flag: 1,
        },
        { where: { influencer_id: influencer_id, brand_id: brand_id } }
      );

      res.status(200).send({
        status: 200,
        cartstatus: 1,
        message: cartUpdata,
      });
    }
  }
}

module.exports = {
  //  updateInfluencerPrice,
  wishlist,
};
