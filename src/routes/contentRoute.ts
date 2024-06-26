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
import { getTextbooksByIds } from "../services/contentService";
const contentRoute = express.Router();

contentRoute.get("/textbook", getAllTextbooksHandler);
contentRoute.get("/textbook/:textbookId", getTextbookByIdHandler);

contentRoute.get("/chapter/:textbookId", getChaptersHandler);
contentRoute.get("/chapter", getChaptersByIdsHandler);

contentRoute.get("/subchapter/:chapterId", getSubchaptersHandler);
contentRoute.get("/subchapter", getSubchaptersByIdsHandler);

contentRoute.get("/subtopic/:subchapterId", getSubtopicsHandler);
contentRoute.get("/subtopic", getSubtopicsByIdsHandler);

export default contentRoute;
