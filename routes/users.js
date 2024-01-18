const express = require("express");
const controllers = require("../controllers/usersController");
const router = express.Router();
const validateBody = require("../decorators/validateBody");
const { usersSchemas, loginSchemas } = require("../schemas/usersSchemas");
const authenticate = require("../middlewares/authenticate");
const upload = require("../middlewares/upload");
router.post("/signup", validateBody(usersSchemas), controllers.register);

router.post("/login", validateBody(loginSchemas), controllers.login);

router.post("/logout", authenticate, controllers.logout);

router.get("/current", authenticate, controllers.current);
router.patch(
  "/avatar",
  authenticate,
  upload.single("avatar"),
  controllers.updateAvatar
);

module.exports = router;
