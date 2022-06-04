import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import { UserModel } from "../model/";

export const register = async (req: Request, res: Response) => {
  const { username } = req.body;

  try {
    const user = await UserModel.findOne({ username });
    const token = jwt.sign({ username }, config.JWT_SECRET, {
      expiresIn: "1d",
    });

    if (user && user.authType) {
      return res.json({
        id: user.id,
        accessToken: token,
      });
    }

    if (user) {
      return res.status(400).json({ message: "Username already existed" });
    }

    if (req.body.oauthType) {
      const newOAuthUser = await UserModel.create({
        username,
        authType: req.body.oauthType,
        email: req.body.email || "",
        bio: req.body.email || "",
        phone: req.body.phone || "",
        photoUrl: req.body.photoUrl || "",
        oauthId: req.body.oauthId || "",
        fullName: req.body.fullName || "",
      });

      return res.json({
        id: newOAuthUser.id,
        accessToken: token,
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newLocalUser = await UserModel.create({
      username,
      password: hashedPassword,
      authType: "local",
      email: req.body.email || "",
      bio: req.body.email || "",
      phone: req.body.phone || "",
      photoUrl: req.body.photoUrl || "",
    });

    return res.json({
      message: `Create user ${newLocalUser.username} successfully`,
    });
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
