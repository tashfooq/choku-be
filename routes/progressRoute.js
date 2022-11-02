const express = require("express");
const router = express.Router();
const { saveProgress } = require("../controllers/progressController");
const { verifyToken } = require("../middleware/authMiddleware");

// auth middleware
router.use(verifyToken);

router.post("/save", saveProgress);

module.exports = router;
