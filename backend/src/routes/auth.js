const express = require("express");
const {
  validateRegister,
  validateLogin,
  validateProfile,
} = require("../middlewares/auth");
const { register, login, getProfile } = require("../controllers/auth");
const { authorization } = require("../middlewares/auth");
const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/profile", authorization(1, 2), validateProfile, getProfile);
module.exports = router;
