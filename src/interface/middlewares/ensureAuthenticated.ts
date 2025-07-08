import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

const ensureAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    response.status(403).json({
      message: "Token is missing!",
    });
  }

  const token = authHeader?.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token!,
      `${process.env.SECRETJWT}`
    ) as JwtPayload;

    request.user = {
      id: decoded.sub as string,
    };

    next();
  } catch (err) {
    response.status(401).json({
      message: "Token invalid or expired!",
    });
  }
};

export { ensureAuthenticated };
