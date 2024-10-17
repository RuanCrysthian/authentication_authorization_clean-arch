import { NextFunction, Request, Response } from "express";

declare module "express" {
  export interface Request {
    user?: {
      id: string;
      role: string;
    };
  }
}

export function authorizationMiddleware(requiredRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const userRole = req.user?.role;
    if (!userRole || !requiredRoles.includes(userRole)) {
      res.status(403).json({ message: "Access denied" });
      return;
    }
    next();
  };
}
