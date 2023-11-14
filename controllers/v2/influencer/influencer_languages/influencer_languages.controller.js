const tableNames = require("../../../../utils/table_name");
const operatorsAliases = require("../../../../utils/operator_aliases");
const { success, error } = require("../../../../utils/responseApi");

async function addInfluencerLanguage(req, res) {
  var influencer_id = req.params.influencer_id;
  var language_id = req.body.language_id;

  let addInfluencerLanguageRespData = await Promise.all(
    language_id.map(async (item) => {
      try {
        let influencer_language_info = {
          influencer_id: influencer_id,
          language_id: item,
        };

        var insertInfluencerLanguageInfoQuery =
          await tableNames.influencerLanguage.create(influencer_language_info);

        return insertInfluencerLanguageInfoQuery;
      } catch (error) {
        return { ...item, error };
      }
    })
  );

  if (
    addInfluencerLanguageRespData == "" ||
    addInfluencerLanguageRespData == null
  ) {
    error(res, "language Not Inserted");
  }

  success(
    res,
    "Influencer Language Added",
    "Influencer Language Not Added",
    addInfluencerLanguageRespData,
    1
  );
}

async function influencerLanguageDelete(req, res) {
  var influencer_id = req.params.influencer_id;
  var language_id = req.body.language_id;

  const influencerLanguageDeleteQuery = language_id.map(async (item) => {
    var incluencer_language_find_query =
      await tableNames.influencerLanguage.findAll({
        where: {
          influencer_id: influencer_id,
          language_id: item,
        },
      });

    if (incluencer_language_find_query == "") {
      return res.status(200).send({
        status: 200,
        message: "Already deleted",
      });
    } else {
      return (deleteQuery = await tableNames.influencerLanguage.destroy({
        where: {
          influencer_id: influencer_id,
          language_id: item,
        },
      }));
    }
  });

  const respData = await Promise.all(influencerLanguageDeleteQuery);
  if (respData != 0) {
    success(
      res,
      "Influencer Language Deleted successfully",
      "Influencer Language Not Deleted",
      influencerLanguageDeleteQuery,
      1
    );
  } else {
    error(res, "Influencer language Not Removed");
  }
}

module.exports = {
  addInfluencerLanguage,
  influencerLanguageDelete,
};
