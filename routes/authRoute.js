const express = require("express");
const router = express.Router();

//consider putting both these endpoints in one controller calling it authController
const { register } = require("../controllers/register");
const { login } = require("../controllers/login");

router.post("/register", register);
router.post("/login", login);

module.exports = router;
