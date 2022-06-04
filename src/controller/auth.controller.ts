import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import { UserModel } from "../model/";

export const register = async (req: Request, res: Response) => {
  const { username } = req.body;

  try {
    const user = await UserModel.findOne({ username });

    if (user) {
      return res.status(400).json({ message: "Username already existed" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = await UserModel.create({
      username,
      password: hashedPassword,
      authType: "local",
      email: username + "@gmail.com",
      bio: "",
      phone: "",
      photoUrl: "",
    });

    res.json({ message: `Create user ${newUser.username} successfully` });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Username is not existed" });
    }

    const rightPassword = await bcrypt.compare(password, user.password);
    if (!rightPassword) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign({ username }, config.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.json({
      id: user.id,
      accessToken: token,
    });
  } catch (error) {
    console.log(error);
  }
};
