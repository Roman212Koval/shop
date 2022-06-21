const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../db_config");
const { User } = require("../models/model");
const createError = require('http-errors');
const logger = require('../logs/logger');

module.exports = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    
    
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw createError(400, 'Користувач не знайдений (прострочений токен)');
    }
    const decoded = jwt.verify(token, SECRET_KEY);
    const { email } = decoded;
    const user = await User.findOne({ where: { email } });
    if (!user) {  
      throw createError(400, 'Користувач не знайдений');    
    }
    req.user = decoded;
    next();
  } catch (err) {
    next(err);
    //logger.error({ message: `${err.message}` });
    //res.status(400).json({ message: `${err.message}` });
  }
  return null;
};
