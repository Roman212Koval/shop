// const validator = require('validator');
const _ = require("lodash");
const ValidationError = require("./ValidationError");

function badName(req) {
  console.log(`You need input 'name' or ${req.name} - It is not STRING format`);
  throw ValidationError("name", '"name" is required!');
}

function badId() {
  console.log(`You need input ID`);
  throw ValidationError("id", '"id" is required!');
}

class BrandValidator {
  id(req) {
    if (!req.id) {
      badId();
    }
    return req;
  }

  name(req) {
    if (!req.name || !_.isString(req.name)) {
      badName(req);
    }
    return req;
  }

  idName(req) {
    console.log("Validator     Validator     Validator    Validator");
    this.id(req);
    this.name(req);

    return req;
  }
}

module.exports = new BrandValidator();
