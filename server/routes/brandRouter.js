const Router = require("express");
const checkRole = require("../middleware/checkRoleMiddleware");

const router = Router();
const brandController = require("../controllers/brandController");

router.post("/test", checkRole("ADMIN"), brandController.test);
router.post("/", checkRole("ADMIN"), brandController.create);
router.get("/", brandController.getAll);
router.put("/:id", checkRole("ADMIN"), brandController.update);
router.delete("/:id", checkRole("ADMIN"), brandController.deleteOne);

module.exports = router;
