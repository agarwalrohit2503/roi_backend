const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;

const operatorsAliases = {
  $eq: Op.eq,
  $or: Op.or,
  $like: Op.like,
};

module.exports = operatorsAliases;
