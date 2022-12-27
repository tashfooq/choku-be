import express from "express";
import {
  getChapters,
  getSubchapters,
  getTextbookById,
  getTextbooks,
} from "../controllers/contentController";
import verifyToken from "../middleware/authMiddleware";
const contentRoute = express.Router();

// auth middleware
contentRoute.use(verifyToken);

contentRoute.get("/textbooks", getTextbooks);
contentRoute.get("/textbooks/:textbookId", getTextbookById);
contentRoute.get("/textbooks/:textbookId/chapters", getChapters);
contentRoute.get("/subchapter/:chapterId", getSubchapters);

export default contentRoute;
