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
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
const contentRoute = express.Router();

// auth middleware
contentRoute.use(ClerkExpressRequireAuth);

contentRoute.get("/textbook", getAllTextbooksHandler);
contentRoute.get("/textbook/:textbookId", getTextbookByIdHandler);

contentRoute.get("/chapter/:textbookId", getChaptersHandler);
contentRoute.get("/chapter", getChaptersByIdsHandler);

contentRoute.get("/subchapter/:chapterId", getSubchaptersHandler);
contentRoute.get("/subchapter", getSubchaptersByIdsHandler);

contentRoute.get("/subtopic/:subchapterId", getSubtopicsHandler);
contentRoute.get("/subtopic", getSubtopicsByIdsHandler);

export default contentRoute;
