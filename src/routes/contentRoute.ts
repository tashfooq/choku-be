import express from "express";
import {
  getChaptersHandler,
  getSubchaptersHandler,
  getSubtopicsHandler,
  getTextbookByIdHandler,
  getTextbooksHandler,
} from "../controllers/contentController";
import verifyToken from "../middleware/authMiddleware";
const contentRoute = express.Router();

// auth middleware
contentRoute.use(verifyToken);

contentRoute.get("/textbooks", getTextbooksHandler);
contentRoute.get("/textbooks/:textbookId", getTextbookByIdHandler);
contentRoute.get("/textbooks/:textbookId/chapters", getChaptersHandler);
contentRoute.get("/subchapter/:chapterId", getSubchaptersHandler);
contentRoute.get("/subtopic/:subchapterId", getSubtopicsHandler);

export default contentRoute;
