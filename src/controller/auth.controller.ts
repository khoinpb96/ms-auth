import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import { UserModel } from "../model/";
import { responseGenerator } from "../utils";

class AuthController {
  public static async register(req: Request, res: Response) {
    const { username } = req.body;

    try {
      const user = await UserModel.findOne({ username });

      if (user) {
        return res.json(responseGenerator(401, "Username already existed"));
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

      res
        .status(201)
        .json(
          responseGenerator(200, `Create user ${newUser.username} successfully`)
        );
    } catch (error) {
      console.log(error);
    }
  }

  public static async login(req: Request, res: Response) {
    const { username, password } = req.body;
    try {
      const user = await UserModel.findOne({ username });
      if (!user) {
        return res.send(responseGenerator(400, "Username is not existed"));
      }

      const rightPassword = await bcrypt.compare(password, user.password);
      if (!rightPassword) {
        return res.send(responseGenerator(400, "Wrong password"));
      }

      // const token = jwt.sign({ username }, config.JWT_SECRET, {
      //   expiresIn: "1d",
      // });

      return res.status(200).json(
        responseGenerator(200, "Login successfully", {
          authType: user.authType,
          username: user.username,
          email: user.email,
          bio: user.bio,
          phone: user.phone,
          photoUrl: user.photoUrl,
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  public static async deleteAllUser(_: Request, res: Response) {
    await UserModel.deleteMany();
    return res.json(responseGenerator(200, "All user deleted successfully"));
  }
}

export default AuthController;
