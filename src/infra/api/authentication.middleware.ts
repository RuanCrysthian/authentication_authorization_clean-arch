import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  return new Promise<void>((resolve) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Token missing" });
      return resolve();
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
      next();
      resolve();
    } catch (err) {
      res.status(401).json({ message: "Invalid token" });
      resolve();
    }
  });
}
