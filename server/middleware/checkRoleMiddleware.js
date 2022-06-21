const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../db_config");
const createError = require('http-errors');

module.exports = function (role) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        throw createError(400, 'Користувач не авторизований!');
      }
      const decoded = jwt.verify(token, SECRET_KEY);
      if (decoded.role !== role) {
        throw createError(400, 'Немає доступу!');
      }
      req.user = decoded;
      next();
    } catch (err) {
      next(err);
    }
    return null;
  };
};
