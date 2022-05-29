import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { UserModel } from "../model";

class UserController {
  public static async deleteAllUser(_: Request, res: Response) {
    await UserModel.deleteMany();
    return res.json({ message: "All user deleted successfully" });
  }

  public static async getAllUser(_: Request, res: Response) {
    const users = await UserModel.find();
    if (!users) {
      return res.status(400).json({ message: "Something is wrong" });
    }

    return res.json(users);
  }

  public static async getUser(req: Request, res: Response) {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const respone = {
      id: user.id,
      authType: user.authType,
      bio: user.bio,
      email: user.email,
      phone: user.phone,
      photoUrl: user.photoUrl,
      username: user.username,
    };
    return res.json(respone);
  }

  public static async editUser(req: Request, res: Response) {
    if (req.body.password) {
      const salt = bcrypt.genSaltSync(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(400).json({ message: "User not found" });
    }

    return res.json({ message: "User updated successfully" });
  }
}

export default UserController;
