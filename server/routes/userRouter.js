const Router = require("express");
const checkRole = require("../middleware/checkRoleMiddleware");

const router = Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.post("/admin", checkRole("ADMIN"), userController.makeAdmin);
router.get("/auth", authMiddleware, userController.check);
router.delete("/delete", authMiddleware, userController.delete);
router.patch("/password", authMiddleware, userController.passChange);

module.exports = router;
