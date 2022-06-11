const Router = require("express");

const router = Router();
const brandController = require("../controllers/brandController");

router.post("/test", brandController.test);
router.post("/", brandController.create);
router.get("/", brandController.getAll);
router.put("/:id", brandController.update);
router.delete("/:id", brandController.deleteOne);

module.exports = router;
