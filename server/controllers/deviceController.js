const uuid = require("uuid"); // generation id, name file
const path = require("path");
// const { nextTick, title } = require("process");
const { Device, DeviceInfo } = require("../models/model");
const ApiError = require("../error/apiError");

class DeviceController {
  async create(req, res, next) {
    try {
      const { name, price, brandId, typeId } = req.body;
      let { info } = req.body;
      const { img } = req.files;
      const fileName = `${uuid.v4()}.jpg`;
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        image: fileName,
      });

      if (info) {
        info = JSON.parse(info);
        info.forEach((i) => {
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          });
        });
      }

      return res.json(device);
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }

    return null;
  }

  async getAll(req, res, next) {
    try {
      const { brand, typeId } = req.body;
      let { limit, page } = req.body;
      page = page || 1;
      limit = limit || 8;
      const offset = page * limit - limit;
      let device;

      if (!brand && !typeId) {
        device = await Device.findAll({ limit, offset });
      }

      if (brand && !typeId) {
        device = await Device.findAll({ where: { brand } });
      }

      if (brand && !typeId) {
        device = await Device.findAll({ where: { typeId } });
      }

      if (brand && typeId) {
        device = await Device.findAll({ where: { typeId, brand } });
      }

      return res.json(device);
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }

    return null;
  }

  async getOne(req, res) {
    const { id } = req.params;
    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: "info" }],
    });

    return res.json(device);
  }
}

module.exports = new DeviceController();
