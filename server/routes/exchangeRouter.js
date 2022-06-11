const Router = require("express");

const router = Router();
const deviceController = require("../controllers/exchangeController");

// router.post("/", deviceController.create);
router.get("/", deviceController.get);
// router.get("/:id", deviceController.getOne);

module.exports = router;
