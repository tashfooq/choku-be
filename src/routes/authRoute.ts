import express from "express";
import { getUser, login, register } from "../controllers/authController";
import verifyToken from "../middleware/authMiddleware";
const authRoute = express.Router();

authRoute.post("/register", register);
authRoute.post("/login", login);

authRoute.use(verifyToken);
authRoute.get("/user", getUser);

export default authRoute;
