const createError = require("http-errors");

module.exports = (param, message) => {
  throw createError(400, message);
};
