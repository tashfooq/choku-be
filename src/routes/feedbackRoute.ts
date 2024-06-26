import express from "express";
import { sendFeedbackHandler } from "../controllers/feedbackController";

const feedbackRoute = express.Router();

feedbackRoute.post("/send", sendFeedbackHandler);

export default feedbackRoute;
