const { Type } = require("../models/model");
const Validator = require("../validator/Validator");
// const ApiError = require("../error/apiError");

class TypeController {
  async create(req, res) {
    try {
      const { name } = Validator.name(req.body);
      const type = await Type.create({ name });
      return res.json(type);
    } catch (err) {
      console.log(`Error  Error   Error   Error`);
      return res.send(err);
    }
  }

  async getAll(req, res) {
    const types = await Type.findAll();
    return res.json(types);
  }

  async update(req, res) {
    try {
      const { name } = Validator.name(req.body);
      const { id } = Validator.id(req.params);
      const update = await Type.update(
        {
          name,
        },
        {
          where: { id },
        }
      );
      return res.json(update);
    } catch (err) {
      console.log(`Error  Error   Error   Error`);
      return res.send(err);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const del = Type.destroy({
        where: {
          id,
        },
      });

      return res.json(del);
    } catch (err) {
      console.log(`Error  Error   Error   Error`);
      return res.send(err);
    }
  }
}

module.exports = new TypeController();
