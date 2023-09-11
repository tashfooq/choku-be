import express from "express";
import {
  getChaptersHandler,
  getSubchaptersHandler,
  getSubtopicsHandler,
  getTextbookByIdHandler,
  getAllTextbooksHandler,
  getTextbooksByIdsHandler,
  getChaptersByIdsHandler,
  getSubchaptersByIdsHandler,
  getSubtopicsByIdsHandler,
} from "../controllers/contentController";
import verifyToken from "../middleware/authMiddleware";
import { getTextbooksByIds } from "../services/contentService";
const contentRoute = express.Router();

// auth middleware
contentRoute.use(verifyToken);

contentRoute.get("/textbooks", getAllTextbooksHandler);
contentRoute.get("/textbooks/:textbookId", getTextbookByIdHandler);
contentRoute.get("/textbooksById", getTextbooksByIdsHandler)
// need to remove the below route
contentRoute.get("/textbooks/:textbookId/chapters", getChaptersHandler);
// need to keep the route below
contentRoute.get("/chapters/:chapterId", getChaptersHandler);
contentRoute.get("/chapters", getChaptersByIdsHandler);
// add an s after all these for consistenncy
contentRoute.get("/subchapter/:chapterId", getSubchaptersHandler);
contentRoute.get("/subchapters", getSubchaptersByIdsHandler);
contentRoute.get("/subtopic/:subchapterId", getSubtopicsHandler);
contentRoute.get("/subtopics", getSubtopicsByIdsHandler);

export default contentRoute;
