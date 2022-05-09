import { Request, Response, NextFunction } from "express";

const checkInput = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Your input is invalid");
  } else if (username.trim().length < 6 || password.trim().length < 6) {
    return res.status(400).send("Your input is invalid");
  }
  next();
};

export { checkInput };
