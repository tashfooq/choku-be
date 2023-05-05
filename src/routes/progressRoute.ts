import express from "express";
import {
  getProgressHandler,
  saveProgressHandler,
} from "../controllers/progressController";
import verifyToken from "../middleware/authMiddleware";
const progressRoute = express.Router();

// auth middleware
progressRoute.use(verifyToken);

progressRoute.post("/", saveProgressHandler);
progressRoute.get("/", getProgressHandler);

export default progressRoute;
