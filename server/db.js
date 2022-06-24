const { Sequelize } = require("sequelize");
const dbInfo = require("./db_config");

module.exports = new Sequelize(dbInfo.url, {
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
