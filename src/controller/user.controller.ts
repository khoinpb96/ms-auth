import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import { UserModel } from "../model";
import { responseGenerator } from "../utils";

class UserController {
  public static async deleteAllUser(_: Request, res: Response) {
    await UserModel.deleteMany();
    return res.json(responseGenerator(200, "All user deleted successfully"));
  }

  public static async getAllUser(_: Request, res: Response) {
    const users = await UserModel.find();
    return res.json(
      responseGenerator(200, "Successfully get all users", users)
    );
  }
}

export default UserController;
