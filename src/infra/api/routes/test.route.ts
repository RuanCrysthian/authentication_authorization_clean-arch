import express, { Request, Response } from "express";
import { authMiddleware } from "../authentication.middleware";
import { authorazationMiddleware } from "../authorazation.middleware";

export const testRoute = express.Router();

testRoute.get(
  "/admin",
  authMiddleware,
  authorazationMiddleware(["admin"]),
  async (req: Request, res: Response) => {
    res.json({ message: "Welcome, admin!" });
  }
);

testRoute.get(
  "/user",
  authMiddleware,
  authorazationMiddleware(["user"]),
  async (req: Request, res: Response) => {
    res.json({ message: "Welcome, user!" });
  }
);

testRoute.get(
  "/all",
  authMiddleware,
  authorazationMiddleware(["admin", "user"]),
  async (req: Request, res: Response) => {
    res.json({ message: "Welcome, all!" });
  }
);
