const { Brand } = require("../models/model");
const BrandValidator = require("../validator/Validator");
// const ApiError = require("../error/apiError");

class IdNameController {
  async create(req, res) {
    try {
      const { name } = BrandValidator.name(req.body);
      const brand = await Brand.create({ name });

      return res.json(brand);
    } catch (err) {
      console.log(`Error  Error   Error   Error`);
      return res.send(err);
    }
  }

  async getAll(req, res) {
    const brands = await Brand.findAll();
    return res.json(brands);
  }

  async deleteOne(req, res) {
    try {
      const { id } = req.params;

      const del = Brand.destroy({
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

  async update(req, res) {
    try {
      const { name } = BrandValidator.name(req.body);
      const { id } = BrandValidator.id(req.params);
      const update = await Brand.update(
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

  test(req, res) {
    try {
      const { name } = BrandValidator.idName(req.body);

      return res.send(name);
    } catch (err) {
      console.log(`Error  Error   Error   Error`);
      return res.send(err);
    }
  }
}

module.exports = new IdNameController();
