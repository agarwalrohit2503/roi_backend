const tableNames = require("../../../utils/table_name");
const { db, sequelize } = require("../../../utils/conn");
var jwt = require("jsonwebtoken");

async function getCampaigns(req, res) {
  selectQuery = `SELECT 
    c.campaign_id,
    c.brand_id,
    c.campaign_name,
    c.campaign_about,
    c.language,
    c.campaign_budget,
    c.createdAt
     FROM ${tableNames.campaign} as c WHERE c.campaign_delete = 0
     ${
       req.query.search_term
         ? ` and c.campaign_name LIKE '%${req.query.search_term}%'`
         : ""
     }
     ${
      req.query.limit 
      ? `limit ${req.query.limit} ` 
      : ""
    }
    ${
      req.query.offset 
      ? `offset ${req.query.offset} ` 
      : ""
    }`;
    result = await sequelize.query(selectQuery, {
      type: sequelize.QueryTypes.SELECT,
    });
    if (result.length != 0) {
      res.status(200).send({
        status: 200,
        message: "Data Found",
        data: result,
      });
    } else {
      res.status(404).send({
        status: 404,
        message: "Not Found",
      });
    }
}

async function getCampaignDetails(req, res) {
  campaign_id = req.params.campaign_id;
  selectQuery = `SELECT * FROM ${tableNames.campaign}  ${
    campaign_id ? `WHERE campaign_id  = ${campaign_id}` : ""
  }`;
  result = await sequelize.query(selectQuery, {
    type: sequelize.QueryTypes.SELECT,
  });

  if (result.length != 0) {
    res.status(200).send({
      status: 200,
      message: "Data found",
      data: result,
    });
  } else {
    res.status(404).send({
      status: 404,
      message: "Campaign not found",
    });
  }
}

async function addCampaigns(req, res) {
  Name = req.body.Name;

  test = ["1,2,3"];
  sqlQuery = `INSERT INTO  ${tableNames.campaign}
    (brand_id) 
    VALUES ('${test}')`;

  result = await sequelize.query(sqlQuery, {
    type: sequelize.QueryTypes.INSERT,
  });
  if (result.length != 0) {
    res.status(200).send({
      status: 200,
      message: "Data found",
      data: result,
    });
  } else {
    res.status(404).send({
      status: 404,
      message: "INTERNAL ERROR",
    });
  }
}

async function guestApi(req, res) {
  campaign_id = req.params.campaign_id;
  selectQuery = `
   
    

    SELECT 
c.campaign_name,
c.campaign_id,
c.campaign_about ,
c.language,
c.campaign_start_dt,
c.campaign_end_dt,
c.campaign_image,
c.campaign_budget,
b.brand_logo,
b.name


FROM ${tableNames.campaign} as c
 LEFT JOIN ${tableNames.brand} as b ON c.brand_id = b.brands_id 

    `;

  result = await sequelize.query(selectQuery, {
    type: sequelize.QueryTypes.SELECT,
  });

  if (result.length != 0) {
    res.status(200).send({
      status: 200,
      message: "Data found",
      data: result,
    });
  } else {
    res.status(404).send({
      status: 404,
      message: "Campaign not found",
    });
  }
}

async function applied(req, res) {
  influencer_id = req.params.influencer_id;

  selectQuery = `
      SELECT
      camapplied.influencer_id,
      camapplied.campaign_applied_id,
      c.campaign_name,
        c.campaign_id,
        c.campaign_about ,
        c.language,
        c.campaign_start_dt,
        c.campaign_end_dt,
        c.campaign_image,
        c.campaign_budget,
        b.brand_logo,
        b.name,
        f.campaign_status_name

        FROM ${tableNames.campaign_applied}  as camapplied
        LEFT JOIN ${
          tableNames.campaign
        } as c ON camapplied.campaign_id = c.campaign_id
         LEFT JOIN ${
           tableNames.campaign_status
         } as f ON camapplied.campaign_status_id = f.campaign_status_id
         LEFT JOIN ${tableNames.brand} as b ON c.brand_id = b.brands_id
         WHERE
         camapplied.influencer_id = ${influencer_id}
         and
         c.campaign_delete = 0

         ${
           req.query.status_id
             ? ` and f.campaign_status_id IN(${req.query.status_id.split(
                 ","
               )}) `
             : ""
         }
         ${req.query.limit ? `limit  ${req.query.limit} ` : ""}
         ${req.query.offset ? `offset ${req.query.offset} ` : ""}
        `;

  result = await sequelize.query(selectQuery, {
    type: sequelize.QueryTypes.SELECT,
  });

  if (result.length != 0) {
    res.status(200).send({
      status: 200,
      message: "Data found",
      data: result,
    });
  } else {
    res.status(404).send({
      status: 404,
      message: "Campaign not found",
    });
  }
}
module.exports = {
  addCampaigns,
  getCampaignDetails,
  getCampaigns,
  guestApi,
  applied,
};
