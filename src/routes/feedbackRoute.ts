import express from "express";
import verifyToken from "../middleware/authMiddleware";
import { sendFeedbackHandler } from "../controllers/feedbackController";

const feedbackRoute = express.Router();

feedbackRoute.use(verifyToken);

feedbackRoute.post("/send", sendFeedbackHandler);

export default feedbackRoute;
