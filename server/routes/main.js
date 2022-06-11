const Router = require("express");

const router = Router();
const deviceRouter = require("./deviceRouter");
const userRouter = require("./userRouter");
const brandRouter = require("./brandRouter");
const typeRouter = require("./typeRouter");
const exchangeRouter = require("./exchangeRouter");

router.use("/user", userRouter);
router.use("/type", typeRouter);
router.use("/device", deviceRouter);
router.use("/brand", brandRouter);
router.use("/exchange", exchangeRouter);

module.exports = router;
