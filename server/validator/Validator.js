const validator = require("validator");
const _ = require("lodash");
const ValidationError = require("./ValidationError");

function badName(req) {
  console.log(`You need input 'name' or ${req.name} - It is not STRING format`);
  throw ValidationError("name", "NAME is incorect!");
}

function badId() {
  console.log(`You need input ID`);
  throw ValidationError("id", "ID is incorect!");
}

function badEmail() {
  console.log(`You need input Email`);
  throw ValidationError("Email", "Email is incorect!");
}

function letStr(str) {
  const okString = validator.isLength(str, { min: 6, max: 20 });
  if (!okString) {
    ValidationError("String", "String must have a minimum length of 6!");
  }
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

  email(req) {
    if (!req.email || !validator.isEmail(req.email)) {
      badEmail();
    }
    return req;
  }

  password(req) {
    letStr(req.password);
    return req;
  }

  changePassword(req) {
    letStr(req.password);
    letStr(req.newPassword);
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
