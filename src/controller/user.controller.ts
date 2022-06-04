import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { UserModel } from "../model";

export const deleteAllUser = async (req: Request, res: Response) => {
  await UserModel.deleteMany();
  return res.json({ message: "All user deleted successfully" });
};

export const getAllUser = async (req: Request, res: Response) => {
  const users = await UserModel.find();
  if (!users) {
    return res.status(400).json({ message: "Something is wrong" });
  }

  return res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
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
    fullName: user.fullName,
  };
  return res.json(respone);
};

export const editUser = async (req: Request, res: Response) => {
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
};
