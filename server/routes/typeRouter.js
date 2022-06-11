const Router = require("express");

const router = Router();
const typeController = require("../controllers/typeController");

router.post("/", typeController.create);
router.get("/", typeController.getAll);
router.put("/:id", typeController.update);
router.delete("/:id", typeController.delete);

module.exports = router;
