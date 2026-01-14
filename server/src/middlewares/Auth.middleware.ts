import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
}

const jwt_secret = process.env.JWT_SECRET as string;

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  console.log("COOKIE HEADER:", req.headers.cookie);
  console.log("PARSED COOKIES:", req.cookies);

  if (!token) {
    return res.status(401).json({ message: "not authorized" });
  }

  try {
    const decoded = jwt.verify(token, jwt_secret) as JwtPayload;

    req.userId = decoded.userId;

    next();
  } catch {
    return res.status(401).json({ message: "Invalid Token" });
  }
};
