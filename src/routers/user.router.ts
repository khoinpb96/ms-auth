import express from "express";
import {
  getAllUser,
  getUser,
  editUser,
  deleteAllUser,
} from "../controller/user.controller";
import { checkAccessToken } from "../middleware";

const router = express.Router();

router.get("/", getAllUser);

router.get("/:id", checkAccessToken, getUser);

router.put("/:id", checkAccessToken, editUser);

router.delete("/delete-all", deleteAllUser);

export default router;
