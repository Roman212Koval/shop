// const ApiError = require("../error/apiError");
const Validator = require("../validator/Validator");

class UserController {
  /* async registration(req, res) {}

  async login(req, res) {}
  */
  async check(req, res) {
    try {
      const { id } = Validator.id(req.params);

      return res.json(id);
    } catch (err) {
      return res.send(err);
    }
  }
}

module.exports = new UserController();
