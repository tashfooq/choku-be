import express from "express";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import {
  getProgressHandler,
  saveProgressHandler,
  // getTotalProgressPercentageHandler,
} from "../controllers/progressController";
const progressRoute = express.Router();

progressRoute.post("/", saveProgressHandler);
progressRoute.get("/", getProgressHandler);
// progressRoute.get("/percentage", getTotalProgressPercentageHandler);

export default progressRoute;
