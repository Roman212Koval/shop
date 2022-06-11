const https = require("https");
const ApiError = require("../error/apiError");

class ExchangeController {
  /* async registration(req, res) {}

  async login(req, res) {}  */

  get(req, res, next) {
    // req("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5")

    try {
      let data = "";

      https
        .get(
          "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5",
          (resp) => {
            // A chunk of data has been received.
            resp.on("data", (chunk) => {
              data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on("end", () => {
              data = JSON.parse(data);
              console.log(data);
              res.send(data[0]);
            });
          }
        )
        .on("error", (err) => {
          console.log(`Error: ${err.message}`);
        });
      return 0;
    } catch (err) {
      return next(ApiError.badRequest("APi bank error"));
    }
  }
}

module.exports = new ExchangeController();
