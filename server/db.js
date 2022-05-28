const { Sequelize } = require("sequelize");
const dbInfo = require("./db_config");

module.exports = new Sequelize(dbInfo.name, dbInfo.user, dbInfo.password, {
  dialect: "postgres",
  host: dbInfo.db_host,
  port: dbInfo.db_port,
});
