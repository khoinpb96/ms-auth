import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import { UserModel } from "../model/";
import { AuthSuccessResponse, DefaultResponse } from "../utils";

class AuthController {
  public static async register(req: Request, res: Response) {
    const { username } = req.body;

    try {
      const user = await UserModel.findOne({ username });

      if (user) {
        return res.json(new DefaultResponse(401, "Username already existed"));
      }

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const newUser = await UserModel.create({
        username,
        password: hashedPassword,
        authType: "local",
      });

      const token = jwt.sign({ username }, config.JWT_SECRET, {
        expiresIn: "1d",
      });

      res
        .status(201)
        .json(
          new AuthSuccessResponse(
            201,
            `Create user ${newUser.username} successfully`,
            token
          )
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
        return res.send(new DefaultResponse(400, "Username is not existed"));
      }

      const rightPassword = await bcrypt.compare(password, user.password);
      if (!rightPassword) {
        return res.send(new DefaultResponse(400, "Wrong password"));
      }

      const token = jwt.sign({ username }, config.JWT_SECRET, {
        expiresIn: "1d",
      });

      return res
        .status(200)
        .json(new AuthSuccessResponse(201, "Login successfully", token));
    } catch (error) {
      console.log(error);
    }
  }

  public static async deleteAllUser(_: Request, res: Response) {
    await UserModel.deleteMany();
    return res.json(new DefaultResponse(200, "All user deleted successfully"));
  }
}

export default AuthController;
