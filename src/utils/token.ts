import { User } from "../types/auth";
import jwt from "jsonwebtoken";

export const signJwt = (user: User) => {
  return jwt.sign(user, process.env.JWT_SECRET_KEY, { expiresIn: "4h" });
};
