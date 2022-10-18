const express = require("express");
const router = express.Router();

//consider putting both these endpoints in one controller calling it authController
const { register, login, getUser } = require("../controllers/register");
const { verifyToken } = require("../middleware/authMiddleware");
// const { login } = require("../controllers/login");

router.post("/register", register);
router.post("/login", login);

router.use(verifyToken);
router.get("/user", getUser);

module.exports = router;
