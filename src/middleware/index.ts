import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import config from "../config";

const checkInput = (req: Request, res: Response, next: NextFunction) => {
  const { username, password, oauthType } = req.body;

  if (username && oauthType) {
    return next();
  }

  if (
    !username ||
    !password ||
    username.trim().length < 6 ||
    password.trim().length < 6
  ) {
    return res.status(400).json({
      message: "Your input is invalid",
    });
  }

  return next();
};

const checkAccessToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "Forgot to add token?" });
  }

  try {
    const authUser = jwt.verify(token, config.JWT_SECRET);
  } catch (err: any) {
    return res.status(403).json({ message: "Token is expired or invalid" });
  }

  return next();
};

export { checkInput, checkAccessToken };
