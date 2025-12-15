const express = require("express");
const router = express.Router();
const authController = require("../controller/auth-controller");
const validator = require("../middleware/validator");
const zod = require("../validator/zod-validator");
const validToken = require("../middleware/validToken");

router.get("/", authController.home);
router.post(
  "/registration",
  validator(zod.signupSchema),
  authController.registration
);
router.post("/login", validator(zod.signinSchema), authController.login);
router.post("/contact", validator(zod.msgSchema), authController.contact);
router.get("/user", validToken, authController.user)
router.get("/service", authController.service)


module.exports = router;
