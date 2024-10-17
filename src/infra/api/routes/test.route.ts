import express, { Request, Response } from "express";
import { authMiddleware } from "../authentication.middleware";
import { authorizationMiddleware } from "../authorization.middleware";

export const testRoute = express.Router();

testRoute.get(
  "/admin",
  authMiddleware,
  authorizationMiddleware(["admin"]),
  async (req: Request, res: Response) => {
    res.json({ message: "Welcome, admin!" });
  }
);

testRoute.get(
  "/user",
  authMiddleware,
  authorizationMiddleware(["user"]),
  async (req: Request, res: Response) => {
    res.json({ message: "Welcome, user!" });
  }
);

testRoute.get(
  "/all",
  authMiddleware,
  authorizationMiddleware(["admin", "user"]),
  async (req: Request, res: Response) => {
    res.json({ message: "Welcome, all!" });
  }
);
