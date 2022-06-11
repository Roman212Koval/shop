const express = require("express");
const app = require("express")();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");
const sequelize = require("./db");
// const models = require('./models/model')
const router = require("./routes/main");
const errorHandler = require("./middleware/ErrorMiddleware");

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use("/api", router);

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
