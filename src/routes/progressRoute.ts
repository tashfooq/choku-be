import express from "express";
import { fetchProgress, saveProgress } from "../controllers/progressController";
import verifyToken from "../middleware/authMiddleware";
const progressRoute = express.Router();

// auth middleware
progressRoute.use(verifyToken);

progressRoute.post("/", saveProgress);
progressRoute.get("/", fetchProgress);

export default progressRoute;
