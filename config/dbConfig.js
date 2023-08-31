const path = require("path");

const dotenv = require("dotenv").config({
  path: path.resolve(process.cwd(), ".env"),
});

// module.exports = {
//     HOST: 'localhost',
//     USER: 'root',
//     PASSWORD: '',
//     DB: 'roidb',
//     dialect: 'mysql',
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     },
// }

module.exports = {
  HOST: process.env.HOST,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DB: process.env.DB,

  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
