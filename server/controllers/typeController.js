const { Type } = require("../models/model");
// const ApiError = require("../error/apiError");

class TypeController {
  async create(req, res) {
    const { name } = req.body;
    const type = await Type.create({ name });
    return res.json(type);
  }

  async getAll(req, res) {
    const types = await Type.findAll();
    return res.json(types);
  }

  async update(req, res) {
    const { name } = req.body;
    const { id } = req.params;
    const update = await Type.update(
      {
        name,
      },
      {
        where: { id },
      }
    );
    return res.json(update);
  }

  async delet(req, res) {
    const { id } = req.params;

    const del = Type.destroy({
      where: {
        id,
      },
    });

    return res.json(del);
  }
}

module.exports = new TypeController();
