import { WithAuthProp } from "@clerk/clerk-sdk-node";
import { Request as ReqObj } from "express";

type Test = ReqObj;
declare global {
  namespace Express {
    interface Request extends WithAuthProp<Test> {}
  }
}
