import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.slice("Bearer ".length).trim();
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not configured");
    }

    const payload = jwt.verify(token, secret);
    if (typeof payload === "string" || typeof payload.id !== "string") {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.user = {
      id: payload.id,
    };
    next();
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: "Internal Server Error", message: message });
  }
};

export default auth;
