const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../error/apiError");
// const Validator = require("../validator/Validator");
const Validator = require("../validator/Validator");
const { User, Basket } = require("../models/model");
const { SECRET_KEY } = require("../db_config");
const createError = require('http-errors');

const genarationJWT = (user) =>
  jwt.sign({ id:user.id, email:user.email, role:user.role }, SECRET_KEY, {
    expiresIn: "1h",
  });

const comparePassword = (password, hash, next) => {
  const compare = bcrypt.compareSync(password, hash);
  if (!compare) {
    throw new Error("Incorrect password!!!");
  }
};

class UserController {
  async registration(req, res, next) {
    try {
      const { email } = Validator.email(req.body);      
      const { password } = Validator.password(req.body);
      const candidate = await User.findOne({ where: { email } });
      if (candidate) {
        throw createError(400, 'Email is already in use!');
      }
      const hashPassword = await bcrypt.hash(password, 5);
      const user = await User.create({ email, password: hashPassword });
      const basket = await Basket.create({ userId: user.id });
      const token = genarationJWT(user);
      return res.json({ token, basket });
    } catch (err) {
      next((err));
    }
  }

  async login(req, res, next) {
    try{
      const { email } = Validator.email(req.body);      
      const { password } = Validator.password(req.body);
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw createError(500, 'Користувач не знайдений');
      }

        comparePassword(password, user.password);
        const token = genarationJWT(user);
        return res.json({ token });

    }catch(err){
      next(err);
    }

  }

  async check(req, res) {
    const token = genarationJWT(req.user);
    return res.json({ token });
  }

  async delete(req, res, next) {
    try {
    let { id } = Validator.id(req.user);
    const role = req.user.role;
    
    if(role == "ADMIN"){
      id = req.body.id;
    }
    const user = await User.findOne({ where: { id } });
    if (!user) {
      throw createError(500, 'Користувач не знайдений');
    }
    User.destroy({
      where: {
        id: id,
      },
      
    });

    return res.json(`Ви щойно видалили акаунт ${user.email}`);
  } catch (err) {
    next(err);
  }
  }

  async passChange(req, res, next) {
    try {
      const { password } = Validator.changePassword(req.body);
      let { newPassword } = Validator.changePassword(req.body);      
      const newPasswordHash = await bcrypt.hash(newPassword, 5);
      let {id} = Validator.id(req.user);
      
      const role = req.user.role;
      if(role == "ADMIN"){
        id = req.body.id;
      }
      const user = await User.findOne({ where: { id: id } });
      if (!user) {
        throw createError(500, 'Користувач не знайдений');
      }
      comparePassword(password, user.password, next);
      User.update({ password: newPasswordHash }, { where: { id: id } });
      return res.json({ message: `Пароль вдало змінено для ID: ${id}.` });
    } catch (err) {
      next((err));
    }

    return null;
  }

  async makeAdmin(req, res, next) {
    try {
      const {id} = Validator.id(req.body);
      const user = await User.findOne({ where: { id } });
      if (!user) {
        throw createError(500, 'Користувач не знайдений');
      }
      User.update({ role: "ADMIN" }, { where: { id: id } });
      return res.json({ message: `Доступ надано для користувача id: ${id}` });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();
