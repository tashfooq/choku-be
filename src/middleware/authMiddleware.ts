import { NextFunction, Request, Response } from "express";
import { User } from "../types/auth";

import jwt from "jsonwebtoken";
import { auth } from "express-oauth2-jwt-bearer";
// const jwt = require("jsonwebtoken");

// const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (token == null) return res.sendStatus(401);

//   jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
//     if (err) {
//       console.log(err);
//       return res.sendStatus(403);
//     }
//     req.user = user as User;
//     next();
//   });
// };

const verifyToken = auth({
  audience: "http://localhost:3001/",
  issuerBaseURL: "https://dev-7ljxey41s8vqi4x8.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

export default verifyToken;
