import express from "express";
import { UserController } from "../controller";

const router = express.Router();

router.get("/", UserController.getAllUser);

router.get("/delete-all", UserController.deleteAllUser);

export default router;
