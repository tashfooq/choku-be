import express from "express";
import {
  getProgressHandler,
  saveProgressHandler,
  getTotalProgressPercentageHandler,
} from "../controllers/progressController";
import verifyToken from "../middleware/authMiddleware";
const progressRoute = express.Router();

// auth middleware
progressRoute.use(verifyToken);

progressRoute.post("/", saveProgressHandler);
progressRoute.get("/", getProgressHandler);
progressRoute.get("/percentage", getTotalProgressPercentageHandler);

export default progressRoute;
