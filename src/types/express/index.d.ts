import { User } from "../auth";

export {};

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
