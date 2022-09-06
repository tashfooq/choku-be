const express = require("express");
const router = express.Router();
const {
  getTextbooks,
  getTextbookById,
  getChapters,
  getSubtopics,
} = require("../controllers/textbooks");
const { verifyToken } = require("../middleware/authMiddleware");

//auth middleware
// router.use(verifyToken);

router.get("/textbooks", getTextbooks);
router.get("/textbooks/:textbookId", getTextbookById);
router.get("/textbooks/:textbookId/chapters", getChapters);
router.get("/subtopic/:chapterId", getSubtopics);

module.exports = router;
