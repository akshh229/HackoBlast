import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

/** Extend Express Request to carry the authenticated user id */
export interface AuthRequest extends Request {
  userId?: string;
}

/**
 * JWT auth guard — verifies the Bearer token and attaches userId to req.
 */
export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ error: "No token provided" });
    return;
  }

  const token = header.split(" ")[1];
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET environment variable is not set");
    }
    const decoded = jwt.verify(token, secret) as { id: string };
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
