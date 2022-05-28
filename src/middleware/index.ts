import { NextFunction, Request, Response } from "express";
import { DefaultResponse } from "../utils";

const checkInput = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json(new DefaultResponse(400, "Your input is invalid"));
  } else if (username.trim().length < 6 || password.trim().length < 6) {
    return res.json(
      new DefaultResponse(400, "Your input must be at least 6 characters")
    );
  }

  next();
};

export { checkInput };
