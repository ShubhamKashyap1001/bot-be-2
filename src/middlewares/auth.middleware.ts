import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend Request type so we can attach `user`
declare global {
  namespace Express {
    interface Request {
      user?: { id: number; email: string };
    }
  }
}

interface JwtPayload {
  id: number;
  email: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;


    req.user = { id: decoded.id, email: decoded.email };
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
