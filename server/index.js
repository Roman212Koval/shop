const express = require("express");
const app = require("express")();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");
const sequelize = require("./db");
const models = require("./models/model");
const router = require("./routes/main");
const errorHandler = require("./middleware/ErrorMiddleware");
const logger = require("./logs/logger");

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));

app.use((req, res, next) => {
  logger.info({
    message: `Resource requested: ${req.method} ${req.originalUrl}`,
  });
  next();
});
app.use("/api", router);

app.use((err, req, res, next) => {
  const errors = [];
  if (!Array.isArray(err)) {
    errors.push({
      status: err.status || 500,
      message: err.message || "An error occured",
    });
  } else {
    err.forEach((x) => {
      errors.push({
        status: x.status || 500,
        message: x.message || "An error occured",
      });
    });
  }
  errors.forEach((x) => {
    logger.error({
      message: `${x.message} (status code ${x.status || 500})`,
    });
  });

  res.status(errors[0].status || 500);
  res.send({ errors });
});

app.use(errorHandler); // must be last app.use

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Server started on PC, PORT: ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
