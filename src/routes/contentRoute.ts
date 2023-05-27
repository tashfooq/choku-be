import express from "express";
import {
  getChaptersHandler,
  getSubchaptersHandler,
  getSubtopicsHandler,
  getTextbookByIdHandler,
  getAllTextbooksHandler,
  getChaptersByIdsHanbler,
  getSubchaptersByIdsHanbler,
  getSubtopicsByIdsHandler,
} from "../controllers/contentController";
import verifyToken from "../middleware/authMiddleware";
const contentRoute = express.Router();

// auth middleware
contentRoute.use(verifyToken);

contentRoute.get("/textbooks", getAllTextbooksHandler);
contentRoute.get("/textbooks/:textbookId", getTextbookByIdHandler);
// need to remove the below route
contentRoute.get("/textbooks/:textbookId/chapters", getChaptersHandler);
// need to keep the route below
contentRoute.get("/chapters/:chapterId", getChaptersHandler);
contentRoute.get("/chapters", getChaptersByIdsHanbler);
// add an s after all these for consistenncy
contentRoute.get("/subchapter/:chapterId", getSubchaptersHandler);
contentRoute.get("/subchapters", getSubchaptersByIdsHanbler);
contentRoute.get("/subtopic/:subchapterId", getSubtopicsHandler);
contentRoute.get("/subtopics", getSubtopicsByIdsHandler);

export default contentRoute;
