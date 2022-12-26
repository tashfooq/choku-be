import { NextFunction, Request, Response } from "express";
import { User } from "../types/auth";

import jwt from "jsonwebtoken";
// const jwt = require("jsonwebtoken");

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }
    req.user = user as User;
    next();
  });
};

export default verifyToken;
