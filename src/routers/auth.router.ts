import express from "express";
import { AuthController } from "../controller";
import { checkInput } from "../middleware";

const router = express.Router();

router.post("/register", checkInput, AuthController.register);

router.get("/login", checkInput);

router.get("/delete-all", AuthController.deleteAllUser);

export default router;
