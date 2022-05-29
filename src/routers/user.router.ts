import express from "express";
import { UserController } from "../controller";
import { checkAccessToken } from "../middleware";

const router = express.Router();

router.get("/", UserController.getAllUser);

router.get("/:id", checkAccessToken, UserController.getUser);

router.put("/:id", checkAccessToken, UserController.editUser);

router.delete("/delete-all", UserController.deleteAllUser);

export default router;
