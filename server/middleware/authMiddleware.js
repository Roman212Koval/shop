const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const { SECRET_KEY } = require("../db_config");
const { User } = require("../models/model");

module.exports = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
      throw createError(400, "Користувач не авторизований");
    }
    const decoded = jwt.verify(token, SECRET_KEY);
    if (decoded == null) {
      throw createError(500, "invalid token");
    }
    const { email } = decoded;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw createError(400, "Користувач не знайдений");
    }
    req.user = decoded;
    next();
  } catch (err) {
    next(err);
  }
  return null;
};
